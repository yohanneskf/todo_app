import { PrismaClient } from "@prisma/client"; //[BECAUSE NO OUTPUT] ==> IF OUTPUT THEN USE PATH
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
