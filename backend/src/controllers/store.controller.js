import { prisma } from '../config/db.js';
import { asyncHandler, AppError } from '../utils/errors.js';
import { idSchema, ratingSchema } from '../utils/validation.js';
import { averageRating, pageParams } from '../utils/stats.js';

export const listStores = asyncHandler(async (req, res) => {
  const { search = '', name = '', address = '', category = '', sortBy = 'name', sortOrder = 'asc' } = req.query;
  const { page, limit, skip } = pageParams(req.query, 12);
  const query = String(search || name || '').trim();
  const allowedSort = ['name', 'address', 'createdAt'];
  const orderField = allowedSort.includes(sortBy) ? sortBy : 'name';
  const order = sortOrder === 'desc' ? 'desc' : 'asc';

  const where = {
    ...(query
      ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
            { address: { contains: query, mode: 'insensitive' } },
          ],
        }
      : {}),
    ...(address ? { address: { contains: address, mode: 'insensitive' } } : {}),
    ...(category ? { category: { contains: category, mode: 'insensitive' } } : {}),
  };

  const [total, stores] = await Promise.all([
    prisma.store.count({ where }),
    prisma.store.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [orderField]: order },
      include: { ratings: { select: { value: true, userId: true } } },
    }),
  ]);

  res.json({
    success: true,
    data: stores.map((store) => ({
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      category: store.category,
      image: store.image,
      rating: averageRating(store.ratings),
      ratingsCount: store.ratings.length,
      userRating: store.ratings.find((rating) => rating.userId === req.user.id)?.value ?? null,
    })),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});

export const storeDetails = asyncHandler(async (req, res) => {
  const storeId = idSchema.parse(req.params.storeId);

  const store = await prisma.store.findUnique({
    where: { id: storeId },
    include: {
      owner: { select: { id: true, name: true } },
      ratings: {
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          value: true,
          createdAt: true,
          userId: true,
          user: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!store) throw new AppError(404, 'Store not found');

  const allRatings = store.ratings;
  const distribution = [5, 4, 3, 2, 1].map((value) => {
    const count = allRatings.filter((rating) => rating.value === value).length;
    return {
      rating: value,
      count,
      percentage: allRatings.length ? Math.round((count / allRatings.length) * 100) : 0,
    };
  });

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
      userRating: allRatings.find((rating) => rating.userId === req.user.id)?.value ?? null,
      ratingDistribution: distribution,
      recentRatings: allRatings.slice(0, 10).map((rating) => ({
        id: rating.id,
        rating: rating.value,
        createdAt: rating.createdAt,
        user: rating.user,
      })),
    },
  });
});

export const upsertRating = asyncHandler(async (req, res) => {
  const storeId = idSchema.parse(req.params.storeId);
  const { value } = ratingSchema.parse(req.body);

  const store = await prisma.store.findUnique({ where: { id: storeId } });
  if (!store) throw new AppError(404, 'Store not found');

  const rating = await prisma.rating.upsert({
    where: { userId_storeId: { userId: req.user.id, storeId } },
    update: { value },
    create: { value, userId: req.user.id, storeId },
  });

  res.json({ success: true, data: rating, message: 'Rating saved successfully' });
});
