import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError } from '../utils/errors.js';

export const notFound = (req, _res, next) => {
  next(new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.flatten().fieldErrors,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'A record with the same unique value already exists.',
      });
    }

    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Requested record was not found.',
      });
    }
  }

  const status = error.statusCode || 500;

  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return res.status(status).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(error.details ? { details: error.details } : {}),
  });
};
