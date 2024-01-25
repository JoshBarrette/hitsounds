import { Prisma } from "@prisma/client";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import { type AppRouter } from "~/server/";

export const transformer = superjson;

export function getBaseUrl() {
    if (typeof window !== "undefined") return "";
    // if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    if (process.env.VERCEL_URL) return "https://hitsounds.vercel.app";
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
    return getBaseUrl() + "/api/trpc";
}

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function soundsOrderBy(
    s: string | undefined | null
): Prisma.SoundOrderByWithRelationInput {
    switch (s) {
        case "az":
            return {
                title: "asc",
            };
        case "za":
            return {
                title: "desc",
            };
        case "old":
            return {
                createdAt: "asc",
            };
        default:
            return {
                createdAt: "desc",
            };
    }
}

export function userOrderBy(
    s: string | undefined | null
): Prisma.UserOrderByWithRelationInput {
    switch (s) {
        case "old":
            return {
                createdAt: "asc",
            };
        default:
            return {
                createdAt: "desc",
            };
    }
}

export function getPageCount(total: number, pageSize: number): number {
    const floor = Math.floor(total / pageSize);
    const mod = total % pageSize;
    if (mod === 0 && floor === 0) {
        return 1;
    } else if (total % pageSize === 0) {
        return floor;
    } else {
        return floor + 1;
    }
}
