import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/errors.js';

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  address: user.address,
  role: user.role,
});

export async function register(data) {
  const exists = await prisma.user.findUnique({ where: { email: data.email } });
  if (exists) throw new AppError(409, 'Email is already registered');

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      address: data.address,
      passwordHash: await bcrypt.hash(data.password, 12),
      role: 'USER',
    },
  });

  return publicUser(user);
}

export async function login(data) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
    throw new AppError(401, 'Invalid email or password');
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );

  return { token, user: publicUser(user) };
}

export async function changePassword(userId, currentPassword, newPassword) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError(404, 'User not found');

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) throw new AppError(400, 'Current password is incorrect');

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: await bcrypt.hash(newPassword, 12) },
  });
}
