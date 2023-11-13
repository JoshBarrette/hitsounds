import { z } from "zod";

import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getHello: publicProcedure.query(async () => {
    return "Hello";
  }),
});

export type AppRouter = typeof appRouter;
