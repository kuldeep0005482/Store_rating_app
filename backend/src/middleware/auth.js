import jwt from 'jsonwebtoken';
import { prisma } from '../config/db.js';
import { env } from '../config/env.js';
import { AppError, asyncHandler } from '../utils/errors.js';

export const authenticate = asyncHandler(async (req, _res, next) => {
  const bearer = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : null;
  const token = req.cookies?.token || bearer;

  if (!token) throw new AppError(401, 'Authentication required');

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const userId = Number(payload.id);

    if (!Number.isInteger(userId)) {
      throw new AppError(401, 'Invalid authentication token');
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
      },
    });

    if (!user) throw new AppError(401, 'User no longer exists');

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(401, 'Invalid or expired token');
  }
});

export const authorize = (...roles) => (req, _res, next) => {
  if (!req.user) return next(new AppError(401, 'Authentication required'));
  if (!roles.includes(req.user.role)) {
    return next(new AppError(403, 'You do not have permission for this action'));
  }
  next();
};
