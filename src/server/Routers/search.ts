import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { getPageCount, soundsOrderBy } from "~/trpc/shared";

const DEFAULT_PAGE_SIZE = 20;

export const searchRouter = createTRPCRouter({
    search: publicProcedure
        .input(
            z
                .object({
                    title: z.string().nullish(),
                    soundType: z
                        .literal("hit")
                        .or(z.literal("kill"))
                        .or(z.literal("any"))
                        .nullish(),
                    count: z.number().nullish(),
                    page: z.number().min(0).nullish(),
                    sortBy: z.string(),
                })
                .optional()
        )
        .query(async ({ input, ctx }) => {
            let page = 0;
            if (
                input?.page !== null &&
                input?.page !== undefined &&
                !isNaN(input?.page)
            ) {
                page = (input?.page as number) - 1;
            }

            const orderBy = soundsOrderBy(input?.sortBy);

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
                orderBy,
                take: input?.count ?? DEFAULT_PAGE_SIZE,
                skip: page * (input?.count ?? DEFAULT_PAGE_SIZE),
            });
        }),

    searchPageCount: publicProcedure
        .input(
            z
                .object({
                    title: z.string().nullish(),
                    soundType: z
                        .literal("hit")
                        .or(z.literal("kill"))
                        .or(z.literal("any"))
                        .nullish(),
                    count: z.number().nullish(),
                })
                .optional()
        )
        .query(async ({ input, ctx }) => {
            const total = await ctx.db.sound.count({
                where: {
                    title: {
                        contains: input?.title ?? undefined,
                    },
                    soundType: input?.soundType ?? undefined,
                },
            });

            return getPageCount(total, input?.count ?? DEFAULT_PAGE_SIZE);
        }),

    getSoundByID: publicProcedure
        .input(z.number())
        .query(async ({ input, ctx }) => {
            return await ctx.db.sound.findUnique({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    url: true,
                    soundType: true,
                    createdAt: true,
                },
                where: {
                    id: input,
                },
            });
        }),

    getMySounds: protectedProcedure
        .input(
            z.object({
                title: z.string().nullish(),
                soundType: z
                    .literal("hit")
                    .or(z.literal("kill"))
                    .or(z.literal("any"))
                    .nullish(),
                sortBy: z.string().nullish(),
            })
        )
        .query(async ({ input, ctx }) => {
            const orderBy = soundsOrderBy(input?.sortBy);

            return await ctx.db.user
                .findUnique({
                    where: {
                        userID: ctx.auth.userId,
                    },
                    include: {
                        uploads: {
                            where: {
                                title: { contains: input.title ?? undefined },
                                soundType: input?.soundType ?? undefined,
                            },
                            orderBy,
                        },
                    },
                })
                .then((res) => res?.uploads);
        }),
});
