import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export interface SoundType {
    id: number;
    title: string;
    description: string | null;
    url: string;
    soundType: string;
    createdAt: Date;
    updatedAt: Date;
    uploaderId: number | null;
}
