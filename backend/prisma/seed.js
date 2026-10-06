import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const passwordHash = (password) => bcrypt.hash(password, 12);

async function createUser({ email, password, role, name, address }) {
  return prisma.user.upsert({
    where: { email },
    update: { name, address, role, passwordHash: await passwordHash(password) },
    create: { email, name, address, role, passwordHash: await passwordHash(password) },
  });
}

async function main() {
  const users = {};
  const userData = [
    { key: 'admin', email: 'admin@example.com', password: 'Admin@123', role: Role.ADMIN, name: 'System Administrator', address: 'Pune, Maharashtra' },
    { key: 'user', email: 'user@example.com', password: 'User@123', role: Role.USER, name: 'Normal User Example', address: 'Mumbai, Maharashtra' },
    { key: 'owner', email: 'owner@example.com', password: 'Owner@123', role: Role.STORE_OWNER, name: 'Primary Store Owner Example', address: 'Pune, Maharashtra' },
    { key: 'ownerTwo', email: 'owner2@example.com', password: 'Owner2@123', role: Role.STORE_OWNER, name: 'Secondary Store Owner Example', address: 'Bengaluru, Karnataka' },
    { key: 'userTwo', email: 'user2@example.com', password: 'User2@123', role: Role.USER, name: 'Second Normal User Example', address: 'Delhi, India' },
    { key: 'userThree', email: 'user3@example.com', password: 'User3@123', role: Role.USER, name: 'Third Normal User Example', address: 'Chennai, Tamil Nadu' },
  ];

  for (const data of userData) users[data.key] = await createUser(data);

  const stores = [
    { id: 1, name: 'TechMart Electronics', email: 'store@example.com', address: 'Baner Road, Pune, Maharashtra', ownerId: users.owner.id },
    { id: 2, name: 'Daily Needs Supermarket', email: 'daily@example.com', address: 'Kothrud, Pune, Maharashtra', ownerId: null },
    { id: 3, name: 'Green Basket Organic Foods', email: 'greenbasket@example.com', address: 'Indiranagar, Bengaluru, Karnataka', ownerId: users.ownerTwo.id },
    { id: 4, name: 'Urban Style Fashion Store', email: 'urbanstyle@example.com', address: 'Connaught Place, Delhi, India', ownerId: users.ownerTwo.id },
    { id: 5, name: 'Home Comfort Furniture', email: 'homecomfort@example.com', address: 'Anna Nagar, Chennai, Tamil Nadu', ownerId: users.owner.id },
    { id: 6, name: 'Book Nook Learning Center', email: 'booknook@example.com', address: 'Koregaon Park, Pune, Maharashtra', ownerId: null },
  ];

  for (const store of stores) {
    await prisma.store.upsert({ where: { id: store.id }, update: store, create: store });
  }

  const ratings = [
    [users.user.id, 1, 5], [users.user.id, 2, 4], [users.user.id, 3, 5], [users.user.id, 4, 3],
    [users.userTwo.id, 1, 4], [users.userTwo.id, 2, 5], [users.userTwo.id, 3, 4], [users.userTwo.id, 5, 3],
    [users.userThree.id, 1, 3], [users.userThree.id, 2, 4], [users.userThree.id, 4, 5], [users.userThree.id, 6, 5],
  ];

  for (const [userId, storeId, value] of ratings) {
    await prisma.rating.upsert({
      where: { userId_storeId: { userId, storeId } },
      update: { value },
      create: { userId, storeId, value },
    });
  }

  console.log(`Seed complete: ${userData.length} users, ${stores.length} stores, ${ratings.length} ratings`);
  console.log('Demo accounts: admin@example.com, user@example.com, owner@example.com');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
