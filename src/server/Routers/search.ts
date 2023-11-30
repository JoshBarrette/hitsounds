import { TRPCError } from "@trpc/server";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const DEFAULT_PAGE_SIZE = 20;

export const searchRouter = createTRPCRouter({
    search: publicProcedure
        .input(
            z
                .object({
                    title: z.string().nullish(),
                    soundType: z.string().nullish(),
                    count: z.number().nullish(),
                    page: z.number().nullish(),
                    sortBy: z.string(),
                })
                .optional()
        )
        .query(async ({ input, ctx }) => {
            if (
                (input?.soundType !== "hit" &&
                    input?.soundType !== "kill" &&
                    input?.soundType !== null &&
                    input?.soundType !== undefined) ||
                (input?.count ?? 1) < 0 ||
                (input?.page ?? 1) < 0
            ) {
                throw new TRPCError({ code: "BAD_REQUEST" });
            }

            let orderBy: Prisma.SoundOrderByWithRelationInput;
            switch (input?.sortBy) {
                case "az":
                    orderBy = {
                        title: "asc",
                    };
                    break;
                case "za":
                    orderBy = {
                        title: "desc",
                    };
                    break;
                case "old":
                    orderBy = {
                        createdAt: "asc",
                    };
                    break;
                default:
                    orderBy = {
                        createdAt: "desc",
                    };
            }

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
                orderBy: orderBy,
                take: input?.count ?? DEFAULT_PAGE_SIZE,
                skip: (input?.page ?? 0) * (input?.count ?? DEFAULT_PAGE_SIZE),
            });
        }),

    searchPageCount: publicProcedure
        .input(
            z
                .object({
                    title: z.string().nullish(),
                    soundType: z.string().nullish(),
                    count: z.number().nullish(),
                })
                .optional()
        )
        .query(async ({ input, ctx }) => {
            if (
                (input?.soundType !== "hit" && input?.soundType !== "kill") ||
                (input.count ?? 1) < 0
            ) {
                throw new TRPCError({ code: "BAD_REQUEST" });
            }

            const total = await ctx.db.sound.count({
                where: {
                    title: {
                        contains: input?.title ?? undefined,
                    },
                    soundType: input?.soundType ?? undefined,
                },
            });

            const floor = Math.floor(
                total / (input.count ?? DEFAULT_PAGE_SIZE)
            );
            if (floor % (input.count ?? DEFAULT_PAGE_SIZE) === 0) {
                return floor;
            } else {
                return floor + 1;
            }
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

    getMySounds: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.db.user
            .findUnique({
                where: {
                    userID: ctx.auth.userId,
                },
                include: {
                    uploads: true,
                },
            })
            .then((res) => res?.uploads);
    }),
});
