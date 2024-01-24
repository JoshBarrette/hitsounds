import { TRPCError } from "@trpc/server";
import { createTRPCRouter, adminProcedure, protectedProcedure } from "../trpc";
import { SoundType } from "../db";
import { z } from "zod";
import { s3Delete } from "~/s3";
import { Prisma } from "@prisma/client";

const DEFAULT_PAGE_SIZE = 25;

export const adminRouter = createTRPCRouter({
    isAdmin: protectedProcedure.query(async ({ ctx }) => {
        const user = await ctx.db.user.findUnique({
            where: { userID: ctx.auth.userId },
        });

        if (user) {
            return user.isAdmin;
        } else {
            return false;
        }
    }),
    getUsers: adminProcedure.query(async ({ ctx }) => {
        return await ctx.db.user.findMany();
    }),
    getSounds: adminProcedure.query(async ({ ctx }) => {
        return await ctx.db.sound.findMany();
    }),
    getSingleSound: adminProcedure
        .input(z.number().catch(-1))
        .query(async ({ input, ctx }) => {
            if (input === -1) {
                return await ctx.db.sound.findFirst({
                    include: { uploader: true },
                });
            }

            return await ctx.db.sound.findUnique({
                where: {
                    id: input,
                },
                include: { uploader: true },
            });
        }),
    deleteSound: adminProcedure
        .input(z.number())
        .mutation(async ({ input, ctx }) => {
            const sound = await ctx.db.sound.findUnique({
                where: { id: input },
            });

            await s3Delete(sound as SoundType).catch((err) => {
                console.log(err);
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
            });

            return await ctx.db.sound.delete({ where: { id: input } });
        }),
    searchSounds: adminProcedure
        .input(
            z.object({
                title: z.string().nullish(),
                soundType: z.string().nullish(),
                count: z.number().nullish(),
                page: z.number().nullish(),
                sortBy: z.string(),
                uploader: z.string().nullish(),
            })
        )
        .query(async ({ input, ctx }) => {
            let uploaderId = undefined;
            if (input?.uploader) {
                const uploader = await ctx.db.user.findUnique({
                    where: { userID: input.uploader },
                });

                if (!uploader) {
                    return null;
                } else {
                    uploaderId = uploader.id;
                }
            }

            if (
                (input?.soundType !== "hit" &&
                    input?.soundType !== "kill" &&
                    input?.soundType !== "any" &&
                    input?.soundType !== null &&
                    input?.soundType !== undefined) ||
                (input?.count ?? 1) < 0 ||
                (input?.page ?? 1) <= 0
            ) {
                throw new TRPCError({ code: "BAD_REQUEST" });
            }

            let page = 0;
            if (
                input?.page !== null &&
                input?.page !== undefined &&
                !isNaN(input?.page)
            ) {
                page = (input?.page as number) - 1;
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

            let soundType = undefined;
            if (input?.soundType === "hit" || input?.soundType === "kill") {
                soundType = input?.soundType;
            }

            return await ctx.db.sound.findMany({
                where: {
                    title: {
                        contains: input?.title ?? undefined,
                    },
                    soundType: soundType,
                    uploaderId,
                },
                orderBy: orderBy,
                take: input?.count ?? DEFAULT_PAGE_SIZE,
                skip: page * (input?.count ?? DEFAULT_PAGE_SIZE),
            });
        }),
    searchSoundsPageCount: adminProcedure
        .input(
            z
                .object({
                    title: z.string().nullish(),
                    soundType: z.string().nullish(),
                    count: z.number().nullish(),
                    uploader: z.string().nullish(),
                })
                .optional()
        )
        .query(async ({ input, ctx }) => {
            let uploaderId = undefined;
            if (input?.uploader) {
                const uploader = await ctx.db.user.findUnique({
                    where: { userID: input.uploader },
                });

                if (!uploader) {
                    return 0;
                } else {
                    uploaderId = uploader.id;
                }
            }

            const total = await ctx.db.sound.count({
                where: {
                    title: {
                        contains: input?.title ?? undefined,
                    },
                    soundType: input?.soundType ?? undefined,
                    uploaderId,
                },
            });

            const floor = Math.floor(
                total / (input?.count ?? DEFAULT_PAGE_SIZE)
            );
            const mod = total % (input?.count ?? DEFAULT_PAGE_SIZE);
            if (mod === 0 && floor === 0) {
                return 1;
            } else if (total % (input?.count ?? DEFAULT_PAGE_SIZE) === 0) {
                return floor;
            } else {
                return floor + 1;
            }
        }),
    searchUsers: adminProcedure
        .input(
            z.object({
                userID: z.string().nullish(),
                count: z.number().nullish(),
                page: z.number().nullish(),
                sortBy: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            let orderBy: Prisma.UserOrderByWithRelationInput;
            switch (input?.sortBy) {
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

            let page = 0;
            if (
                input?.page !== null &&
                input?.page !== undefined &&
                !isNaN(input?.page)
            ) {
                page = (input?.page as number) - 1;
            }

            return await ctx.db.user.findMany({
                where: {
                    userID: {
                        contains: input?.userID ?? undefined,
                    },
                },
                orderBy: orderBy,
                take: input?.count ?? DEFAULT_PAGE_SIZE,
                skip: page * (input?.count ?? DEFAULT_PAGE_SIZE),
            });
        }),
    searchUsersPageCount: adminProcedure
        .input(
            z
                .object({
                    userID: z.string().nullish(),
                    count: z.number().nullish(),
                })
                .optional()
        )
        .query(async ({ input, ctx }) => {
            const total = await ctx.db.user.count({
                where: {
                    userID: {
                        contains: input?.userID ?? undefined,
                    },
                },
            });

            const floor = Math.floor(
                total / (input?.count ?? DEFAULT_PAGE_SIZE)
            );
            const mod = total % (input?.count ?? DEFAULT_PAGE_SIZE);
            if (mod === 0 && floor === 0) {
                return 1;
            } else if (total % (input?.count ?? DEFAULT_PAGE_SIZE) === 0) {
                return floor;
            } else {
                return floor + 1;
            }
        }),
});
