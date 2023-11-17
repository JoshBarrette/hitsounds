import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const filesRouter = router({
    upload: publicProcedure // Need to use presigned URL
        .input(
            z.object({
                soundName: z.string(),
                soundType: z.string(),
                soundDescription: z.string().nullish(),
                soundUploader: z.string(),
            })
        )
        .mutation(async (input) => {
            return "upload";
        }),
    update: publicProcedure.mutation(async () => "update"),
    delete: publicProcedure.mutation(async () => "delete"),
});
