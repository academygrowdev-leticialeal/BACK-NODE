import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { envs } from '../envs';

const adapter = new PrismaPg({ connectionString: envs.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export { prisma };