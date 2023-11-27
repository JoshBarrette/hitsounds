import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { s3Delete } from "~/s3";
import { SoundType } from "../db";

export const filesRouter = createTRPCRouter({
    update: protectedProcedure.mutation(async () => "update"),
    delete: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input, ctx }) => {
            const sounds = await ctx.db.user.findUnique({
                where: {
                    userID: ctx.auth.userId,
                },
                include: {
                    uploads: {
                        where: {
                            id: input.id,
                        },
                    },
                },
            });

            const sound = sounds?.uploads.at(0);

            if (sounds?.userID !== ctx.auth.userId) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            } else if (sound === undefined) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            await s3Delete(sound as SoundType).catch((err) => {
                console.log(err);
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
            });

            await ctx.db.sound
                .delete({
                    where: {
                        id: input.id,
                    },
                })
                .catch((err) => {
                    console.log(err);
                    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
                });

            return { id: input.id };
        }),
});
