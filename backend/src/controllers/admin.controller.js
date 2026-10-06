import bcrypt from 'bcryptjs';
import { prisma } from '../config/db.js';
import { asyncHandler, AppError } from '../utils/errors.js';
import {
  createUserSchema,
  updateUserSchema,
  createStoreSchema,
  updateStoreSchema,
  idSchema,
} from '../utils/validation.js';
import { averageRating, ratingDistribution, pageParams } from '../utils/stats.js';

const userSelect = {
  id: true,
  name: true,
  email: true,
  address: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

export const dashboard = asyncHandler(async (_req, res) => {
  const [totalUsers, totalStores, allRatings, recentRatings, topStores] = await Promise.all([
    prisma.user.count(),
    prisma.store.count(),
    prisma.rating.findMany({ select: { value: true } }),
    prisma.rating.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        value: true,
        createdAt: true,
        user: { select: { id: true, name: true } },
        store: { select: { id: true, name: true } },
      },
    }),
    prisma.store.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        ratings: { select: { value: true } },
      },
    }),
  ]);

  const sortedTopStores = topStores
    .map((store) => ({
      id: store.id,
      name: store.name,
      rating: averageRating(store.ratings),
      ratingsCount: store.ratings.length,
    }))
    .sort((a, b) => b.rating - a.rating);

  // Monthly counts used by the Admin Dashboard Rating Overview chart.
  const monthlyRows = await prisma.$queryRaw`
    SELECT
      EXTRACT(MONTH FROM "created_at")::int AS month,
      COUNT(*)::int AS count
    FROM "ratings"
    WHERE "created_at" >= DATE_TRUNC('year', CURRENT_DATE)
      AND "created_at" < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
    GROUP BY EXTRACT(MONTH FROM "created_at")
    ORDER BY month
  `;

  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthlyMap = new Map(monthlyRows.map((row) => [Number(row.month), Number(row.count)]));
  const ratingOverview = monthNames.map((month, index) => ({
    month,
    count: monthlyMap.get(index + 1) || 0,
  }));

  res.json({
    success: true,
    data: {
      stats: {
        totalUsers,
        totalStores,
        totalRatings: allRatings.length,
      },
      ratingDistribution: ratingDistribution(allRatings),
      ratingOverview,
      recentRatings: recentRatings.map((rating) => ({
        id: rating.id,
        rating: rating.value,
        createdAt: rating.createdAt,
        user: rating.user,
        store: rating.store,
      })),
      topStores: sortedTopStores,
    },
  });
});

export const listRatings = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page || 1));
  const limit = Math.min(100, Math.max(1, Number(req.query.limit || 20)));
  const [total, data] = await Promise.all([
    prisma.rating.count(),
    prisma.rating.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        value: true,
        createdAt: true,
        user: { select: { id: true, name: true, email: true } },
        store: { select: { id: true, name: true } },
      },
    }),
  ]);

  res.json({
    success: true,
    data: data.map((r) => ({
      id: r.id,
      rating: r.value,
      createdAt: r.createdAt,
      user: r.user,
      store: r.store,
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  });
});

export const listUsers = asyncHandler(async (req, res) => {
  const {
    name = '',
    email = '',
    address = '',
    role = '',
    sortBy = 'name',
    sortOrder = 'asc',
  } = req.query;
  const { page, limit, skip } = pageParams(req.query);

  const allowedSort = ['name', 'email', 'address', 'role', 'createdAt'];
  const orderField = allowedSort.includes(sortBy) ? sortBy : 'name';
  const order = sortOrder === 'desc' ? 'desc' : 'asc';

  const where = {
    name: { contains: name, mode: 'insensitive' },
    email: { contains: email, mode: 'insensitive' },
    address: { contains: address, mode: 'insensitive' },
    ...(role ? { role } : {}),
  };

  const [total, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [orderField]: order },
      select: userSelect,
    }),
  ]);

  res.json({
    success: true,
    data: users,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});

export const createUser = asyncHandler(async (req, res) => {
  const data = createUserSchema.parse(req.body);

  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new AppError(409, 'Email is already registered');

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      address: data.address,
      role: data.role,
      passwordHash: await bcrypt.hash(data.password, 12),
    },
    select: userSelect,
  });

  res.status(201).json({ success: true, data: user });
});

export const userDetails = asyncHandler(async (req, res) => {
  const id = idSchema.parse(req.params.id);

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      ...userSelect,
      ownedStores: {
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
          ratings: { select: { value: true } },
        },
      },
      ratings: {
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          value: true,
          createdAt: true,
          store: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!user) throw new AppError(404, 'User not found');

  const submittedRatings = await prisma.rating.count({ where: { userId: id } });
  const lastRating = user.ratings[0]?.createdAt ?? null;

  res.json({
    success: true,
    data: {
      ...user,
      accountActivity: {
        totalRatingsSubmitted: submittedRatings,
        lastRatingDate: lastRating,
        accountStatus: 'Active',
      },
      ownedStores: user.ownedStores.map((store) => ({
        ...store,
        rating: averageRating(store.ratings),
        ratingsCount: store.ratings.length,
        ratings: undefined,
      })),
      accountStatus: 'Active',
      memberSince: user.createdAt,
      recentRatings: user.ratings.map((rating) => ({
        id: rating.id,
        rating: rating.value,
        createdAt: rating.createdAt,
        store: rating.store,
      })),
    },
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const id = idSchema.parse(req.params.id);
  const data = updateUserSchema.parse(req.body);

  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'User not found');

  if (data.email && data.email !== existing.email) {
    const duplicate = await prisma.user.findUnique({ where: { email: data.email } });
    if (duplicate) throw new AppError(409, 'Email is already registered');
  }

  const updateData = {
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.email !== undefined ? { email: data.email } : {}),
    ...(data.address !== undefined ? { address: data.address } : {}),
    ...(data.role !== undefined ? { role: data.role } : {}),
    ...(data.password ? { passwordHash: await bcrypt.hash(data.password, 12) } : {}),
  };

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: userSelect,
  });

  res.json({ success: true, data: user });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const id = idSchema.parse(req.params.id);
  if (id === req.user.id) throw new AppError(400, 'You cannot delete your own account');

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new AppError(404, 'User not found');

  await prisma.user.delete({ where: { id } });
  res.json({ success: true, message: 'User deleted successfully' });
});

export const listStoreOwners = asyncHandler(async (_req, res) => {
  const owners = await prisma.user.findMany({
    where: { role: 'STORE_OWNER' },
    select: { id: true, name: true, email: true, address: true },
    orderBy: { name: 'asc' },
  });

  res.json({ success: true, data: owners });
});

export const listStores = asyncHandler(async (req, res) => {
  const {
    name = '',
    email = '',
    address = '',
    sortBy = 'name',
    sortOrder = 'asc',
  } = req.query;
  const { page, limit, skip } = pageParams(req.query);

  const allowedSort = ['name', 'email', 'address', 'createdAt'];
  const orderField = allowedSort.includes(sortBy) ? sortBy : 'name';
  const order = sortOrder === 'desc' ? 'desc' : 'asc';

  const where = {
    name: { contains: name, mode: 'insensitive' },
    email: { contains: email, mode: 'insensitive' },
    address: { contains: address, mode: 'insensitive' },
  };

  const [total, stores] = await Promise.all([
    prisma.store.count({ where }),
    prisma.store.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [orderField]: order },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        ratings: { select: { value: true } },
      },
    }),
  ]);

  res.json({
    success: true,
    data: stores.map((store) => ({
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      owner: store.owner,
      rating: averageRating(store.ratings),
      ratingsCount: store.ratings.length,
    })),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});

export const createStore = asyncHandler(async (req, res) => {
  const data = createStoreSchema.parse(req.body);

  const owner = await prisma.user.findUnique({ where: { id: data.ownerId } });
  if (!owner) throw new AppError(404, 'Store owner not found');
  if (owner.role !== 'STORE_OWNER') {
    throw new AppError(400, 'Selected user must have STORE_OWNER role');
  }

  const store = await prisma.store.create({
    data: {
      name: data.name,
      email: data.email,
      address: data.address,
      category: data.category || null,
      image: data.image || null,
      ownerId: data.ownerId,
    },
    include: {
      owner: { select: { id: true, name: true, email: true } },
    },
  });

  res.status(201).json({ success: true, data: store });
});

export const storeDetails = asyncHandler(async (req, res) => {
  const id = idSchema.parse(req.params.id);

  const store = await prisma.store.findUnique({
    where: { id },
    include: {
      owner: { select: { id: true, name: true, email: true, address: true } },
      ratings: {
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          value: true,
          createdAt: true,
          user: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!store) throw new AppError(404, 'Store not found');

  const allRatings = await prisma.rating.findMany({ where: { storeId: id }, select: { value: true } });

  const ratingOverview = [];
  const now = new Date();
  for (let i = 11; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    const count = await prisma.rating.count({
      where: { storeId: id, createdAt: { gte: d, lt: next } },
    });
    ratingOverview.push({
      month: d.toLocaleString("en-US", { month: "short" }),
      count,
    });
  }

  res.json({
    success: true,
    data: {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      category: store.category,
      image: store.image,
      owner: store.owner,
      rating: averageRating(allRatings),
      ratingsCount: allRatings.length,
      ratingDistribution: ratingDistribution(allRatings),
      ratingOverview,
      recentRatings: store.ratings,
    },
  });
});

export const updateStore = asyncHandler(async (req, res) => {
  const id = idSchema.parse(req.params.id);
  const data = updateStoreSchema.parse(req.body);

  const existing = await prisma.store.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Store not found');

  if (data.ownerId !== undefined) {
    const owner = await prisma.user.findUnique({ where: { id: data.ownerId } });
    if (!owner || owner.role !== 'STORE_OWNER') {
      throw new AppError(400, 'Selected user must have STORE_OWNER role');
    }
  }

  const store = await prisma.store.update({
    where: { id },
    data: {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.email !== undefined ? { email: data.email } : {}),
      ...(data.address !== undefined ? { address: data.address } : {}),
      ...(data.category !== undefined ? { category: data.category } : {}),
      ...(data.image !== undefined ? { image: data.image || null } : {}),
      ...(data.ownerId !== undefined ? { ownerId: data.ownerId } : {}),
    },
    include: { owner: { select: { id: true, name: true, email: true } } },
  });

  res.json({ success: true, data: store });
});

export const deleteStore = asyncHandler(async (req, res) => {
  const id = idSchema.parse(req.params.id);
  const store = await prisma.store.findUnique({ where: { id } });
  if (!store) throw new AppError(404, 'Store not found');

  await prisma.store.delete({ where: { id } });
  res.json({ success: true, message: 'Store deleted successfully' });
});
