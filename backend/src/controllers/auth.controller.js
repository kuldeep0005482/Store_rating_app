import { registerSchema, loginSchema, passwordSchema } from '../utils/validation.js';
import * as service from '../services/auth.service.js';
import { asyncHandler } from '../utils/errors.js';

const cookieOptions = () => ({
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000,
});

export const register = asyncHandler(async (req, res) => {
  const data = registerSchema.parse(req.body);
  const user = await service.register(data);
  res.status(201).json({ success: true, data: user });
});

export const login = asyncHandler(async (req, res) => {
  const data = loginSchema.parse(req.body);
  const result = await service.login(data);
  res.cookie('token', result.token, cookieOptions());
  res.json({ success: true, data: result.user });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user });
});

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie('token', cookieOptions());
  res.json({ success: true, message: 'Logged out successfully' });
});


export const updateProfile = asyncHandler(async (req, res) => {
  const { name, address } = req.body;
  if (!name && !address) {
    throw new AppError(400, "Provide at least one profile field");
  }

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(address !== undefined ? { address } : {}),
    },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
    },
  });

  res.json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const data = passwordSchema.parse(req.body);
  await service.changePassword(req.user.id, data.currentPassword, data.newPassword);
  res.json({ success: true, message: 'Password updated successfully' });
});
