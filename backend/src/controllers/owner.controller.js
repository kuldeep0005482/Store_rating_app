import { prisma } from '../config/db.js';
import { asyncHandler, AppError } from '../utils/errors.js';
import { idSchema, updateStoreSchema } from '../utils/validation.js';
import { averageRating, ratingDistribution, pageParams } from '../utils/stats.js';

async function getOwnedStore(ownerId) {
  const store = await prisma.store.findFirst({ where: { ownerId } });
  if (!store) throw new AppError(404, 'No store is assigned to this account');
  return store;
}

export const dashboard = asyncHandler(async (req, res) => {
  const store = await getOwnedStore(req.user.id);

  const [allRatings, recentRatings] = await Promise.all([
    prisma.rating.findMany({ where: { storeId: store.id }, select: { value: true } }),
    prisma.rating.findMany({
      where: { storeId: store.id },
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        value: true,
        createdAt: true,
        user: { select: { id: true, name: true } },
      },
    }),
  ]);

  const uniqueUsers = new Set(
    (
      await prisma.rating.findMany({
        where: { storeId: store.id },
        distinct: ['userId'],
        select: { userId: true },
      })
    ).map((rating) => rating.userId)
  ).size;

  res.json({
    success: true,
    data: {
      store: {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        category: store.category,
        image: store.image,
      },
      statistics: {
        averageRating: averageRating(allRatings),
        totalRatings: allRatings.length,
        totalUsersRated: uniqueUsers,
        totalReviews: allRatings.length,
      },
      ratingDistribution: ratingDistribution(allRatings),
      recentRatings: recentRatings.map((rating) => ({
        id: rating.id,
        rating: rating.value,
        createdAt: rating.createdAt,
        user: rating.user,
      })),
    },
  });
});

export const myStore = asyncHandler(async (req, res) => {
  const store = await getOwnedStore(req.user.id);
  const ratings = await prisma.rating.findMany({ where: { storeId: store.id }, select: { value: true } });

  res.json({
    success: true,
    data: {
      ...store,
      rating: averageRating(ratings),
      ratingsCount: ratings.length,
    },
  });
});

export const updateStore = asyncHandler(async (req, res) => {
  const data = updateStoreSchema.omit({ ownerId: true }).parse(req.body);
  const store = await getOwnedStore(req.user.id);

  const updated = await prisma.store.update({
    where: { id: store.id },
    data: {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.email !== undefined ? { email: data.email } : {}),
      ...(data.address !== undefined ? { address: data.address } : {}),
      ...(data.category !== undefined ? { category: data.category } : {}),
      ...(data.image !== undefined ? { image: data.image || null } : {}),
    },
  });

  res.json({ success: true, data: updated });
});

export const ratings = asyncHandler(async (req, res) => {
  const store = await getOwnedStore(req.user.id);
  const { page, limit, skip } = pageParams(req.query);

  const [total, data] = await Promise.all([
    prisma.rating.count({ where: { storeId: store.id } }),
    prisma.rating.findMany({
      where: { storeId: store.id },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        value: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { id: true, name: true, email: true } },
      },
    }),
  ]);

  res.json({
    success: true,
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});
