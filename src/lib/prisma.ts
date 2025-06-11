import { PrismaClient } from '@/generated/prisma';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

if (!globalForPrisma.prisma) {
  console.log('Initializing Prisma Client...');
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Test database connection
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
  }); 