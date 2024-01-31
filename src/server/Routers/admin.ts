import { TRPCError } from "@trpc/server";
import { createTRPCRouter, adminProcedure, protectedProcedure } from "../trpc";
import { SoundType } from "../db";
import { z } from "zod";
import { s3Delete } from "~/s3";
import { getPageCount, soundsOrderBy, userOrderBy } from "~/trpc/shared";

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
                soundType: z
                    .literal("hit")
                    .or(z.literal("kill"))
                    .or(z.literal("any"))
                    .nullish(),
                count: z.number().nullish(),
                page: z.number().min(0).catch(0).nullish(),
                sortBy: z.string(),
                uploader: z.string().nullish(),
            })
        )
        .query(async ({ input, ctx }) => {
            console.log("input: ", input);
            let uploaderId: number | undefined = undefined;
            if (input?.uploader && input?.uploader !== "") {
                const uploader = await ctx.db.user.findUnique({
                    where: { userID: input.uploader },
                });

                if (!uploader) {
                    uploaderId = undefined;
                } else {
                    uploaderId = uploader.id;
                }
            }

            let orderBy = soundsOrderBy(input?.sortBy);

            return await ctx.db.sound.findMany({
                where: {
                    title: {
                        contains: input?.title ?? undefined,
                    },
                    soundType:
                        input?.soundType === "any"
                            ? undefined
                            : (input?.soundType as string),
                    uploaderId,
                },
                orderBy,
                take: input?.count ?? DEFAULT_PAGE_SIZE,
                skip:
                    ((input?.page ?? 1) - 1) *
                    (input?.count ?? DEFAULT_PAGE_SIZE),
            });
        }),
    searchSoundsPageCount: adminProcedure
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
                    uploaderId = undefined;
                } else {
                    uploaderId = uploader.id;
                }
            }

            const total = await ctx.db.sound.count({
                where: {
                    title: {
                        contains: input?.title ?? undefined,
                    },
                    soundType:
                        input?.soundType === "any"
                            ? undefined
                            : (input?.soundType as string),
                    uploaderId,
                },
            });

            return getPageCount(total, input?.count ?? DEFAULT_PAGE_SIZE);
        }),
    searchUsers: adminProcedure
        .input(
            z.object({
                userID: z.string().nullish(),
                count: z.number().nullish(),
                page: z.number().min(0).catch(0).nullish(),
                sortBy: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            const orderBy = userOrderBy(input?.sortBy);

            return await ctx.db.user.findMany({
                include: {
                    _count: true,
                },
                where: {
                    userID: {
                        contains: input?.userID ?? undefined,
                    },
                },
                orderBy,
                take: input?.count ?? DEFAULT_PAGE_SIZE,
                skip:
                    ((input?.page ?? 1) - 1) *
                    (input?.count ?? DEFAULT_PAGE_SIZE),
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

            return getPageCount(total, input?.count ?? DEFAULT_PAGE_SIZE);
        }),
    banUser: adminProcedure
        .input(z.number())
        .mutation(async ({ input, ctx }) => {
            const user = await ctx.db.user.findUnique({ where: { id: input } });

            if (!user || user.isAdmin) {
                throw new TRPCError({ code: "BAD_REQUEST" });
            }

            return await ctx.db.user.update({
                where: { id: input },
                data: { isBanned: true },
            });
        }),
    unBanUser: adminProcedure
        .input(z.number())
        .mutation(async ({ input, ctx }) => {
            const user = await ctx.db.user.findUnique({ where: { id: input } });

            if (!user || user.isAdmin) {
                throw new TRPCError({ code: "BAD_REQUEST" });
            }

            return await ctx.db.user.update({
                where: { id: input },
                data: { isBanned: false },
            });
        }),
});
