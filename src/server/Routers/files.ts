import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";

export const filesRouter = createTRPCRouter({
    update: publicProcedure.mutation(async () => "update"),
    delete: publicProcedure.mutation(async () => "delete"),
});
