import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "../db";
import { z } from "zod";

async function adminCheck(id: string) {
    const user = await db.user.findUnique({
        where: { userID: id },
    });

    if (!user?.isAdmin) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
}

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
    getUsers: protectedProcedure.query(async ({ ctx }) => {
        await adminCheck(ctx.auth.userId);

        return await ctx.db.user.findMany();
    }),
    getSounds: protectedProcedure.query(async ({ ctx }) => {
        await adminCheck(ctx.auth.userId);

        return await ctx.db.sound.findMany();
    }),
    getSingleSound: protectedProcedure
        .input(z.number())
        .query(async ({ input, ctx }) => {
            await adminCheck(ctx.auth.userId);

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
});
