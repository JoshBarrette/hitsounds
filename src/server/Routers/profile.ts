import { publicProcedure, router } from "../trpc";
import { z } from "zod";

const defaultPageSize = 20;

export const profileRouter = router({
    soundsByUploader: publicProcedure
        .input(
            z.object({
                userID: z.string(),
                count: z.number().nullish(),
                page: z.number().nullish(),
                isAscending: z.boolean().nullish(),
            })
        )
        .query(async ({ input, ctx }) => {
            return await ctx.db.user
                .findMany({
                    where: {
                        userID: input.userID,
                    },
                    include: {
                        uploads: {
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
                            skip:
                                (input?.page ?? 0) *
                                (input?.count ?? defaultPageSize),
                        },
                    },
                })
                .then((res) => res[0].uploads);
        }),
});
