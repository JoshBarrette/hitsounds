import { publicProcedure, router } from "../trpc";
import { db } from "../db";

export const searchRouter = router({
    getFirst20Sounds: publicProcedure.query(async ({ ctx }) => {
        return await db.sound.findMany({
            select: {
                title: true,
                description: true,
                url: true,
                soundType: true,
                createdAt: true,
            },
        }); // get first 20 sounds
    }),
});
