import { publicProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";

const defaultPageSize = 20;

export const searchRouter = createTRPCRouter({
    getNSounds: publicProcedure
        .input(
            z
                .object({
                    count: z.number().nullish(),
                    page: z.number().nullish(),
                    isAscending: z.boolean().nullish(),
                })
                .optional()
        )
        .query(async ({ input, ctx }) => {
            return await ctx.db.sound.findMany({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    url: true,
                    soundType: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: input?.isAscending ? "asc" : "desc",
                },
                take: input?.count ?? defaultPageSize,
                skip: (input?.page ?? 0) * (input?.count ?? defaultPageSize),
            });
        }),

    search: publicProcedure
        .input(
            z
                .object({
                    title: z.string().nullish(),
                    soundType: z.string().nullish(),
                    count: z.number().nullish(),
                    page: z.number().nullish(),
                    isAscending: z.boolean().nullish(),
                })
                .optional()
        )
        .query(async ({ input, ctx }) => {
            return await ctx.db.sound.findMany({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    url: true,
                    soundType: true,
                    createdAt: true,
                },
                where: {
                    title: {
                        contains: input?.title ?? undefined,
                    },
                    soundType: input?.soundType ?? undefined,
                },
                orderBy: {
                    createdAt: input?.isAscending ? "asc" : "desc",
                },
                take: input?.count ?? defaultPageSize,
                skip: (input?.page ?? 0) * (input?.count ?? defaultPageSize),
            });
        }),
});
