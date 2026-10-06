import { z } from 'zod';

export const password = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(16, 'Password must be at most 16 characters')
  .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
  .regex(/[^A-Za-z0-9]/, 'Password must include at least one special character');

// The supplied challenge UI uses a 20-60 character name constraint.
export const name = z
  .string()
  .trim()
  .min(20, 'Name must be at least 20 characters')
  .max(60, 'Name must be at most 60 characters');

export const email = z.string().trim().email('Invalid email address').max(255);
export const address = z.string().trim().min(1).max(400, 'Address must be at most 400 characters');

export const registerSchema = z.object({ name, email, address, password });

export const createUserSchema = z.object({
  name,
  email,
  address,
  password,
  role: z.enum(['ADMIN', 'USER', 'STORE_OWNER']),
});

export const updateUserSchema = z.object({
  name: name.optional(),
  email: email.optional(),
  address: address.optional(),
  role: z.enum(['ADMIN', 'USER', 'STORE_OWNER']).optional(),
  password: password.optional(),
});

export const createStoreSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email,
  address,
  category: z.string().trim().max(100).optional().nullable(),
  image: z.string().url().optional().nullable().or(z.literal('')),
  ownerId: z.coerce.number().int().positive(),
});

export const updateStoreSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  email: email.optional(),
  address: address.optional(),
  category: z.string().trim().max(100).optional().nullable(),
  image: z.string().url().optional().nullable().or(z.literal('')),
  ownerId: z.coerce.number().int().positive().optional(),
});

export const loginSchema = z.object({ email, password: z.string().min(1) });

export const ratingSchema = z.object({
  value: z.coerce.number().int().min(1).max(5),
});

export const passwordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: password,
});

export const idSchema = z.coerce.number().int().positive();
