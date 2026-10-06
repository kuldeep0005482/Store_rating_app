import app from './app.js';
import { env } from './config/env.js';
import { prisma } from './config/db.js';

const server = app.listen(env.port, () => {
  console.log(`API running at http://localhost:${env.port}`);
});

const shutdown = async () => {
  console.log('Shutting down server...');
  await prisma.$disconnect();
  server.close(() => process.exit(0));
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
