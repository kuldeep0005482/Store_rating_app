import dotenv from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const backendRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
dotenv.config({ path: resolve(backendRoot, '.env') });

const required = ['DATABASE_URL', 'JWT_SECRET'];
for (const key of required) {
  if (!process.env[key]) throw new Error(`Missing environment variable: ${key}`);
}

export const env = {
  port: Number(process.env.PORT || 5000),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
};
