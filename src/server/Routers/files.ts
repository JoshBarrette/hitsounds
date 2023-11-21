import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const filesRouter = router({
    update: publicProcedure.mutation(async () => "update"),
    delete: publicProcedure.mutation(async () => "delete"),
});
