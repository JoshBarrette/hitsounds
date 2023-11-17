import { publicProcedure, router } from "./trpc";
import { filesRouter } from "./Routers/files";

export const appRouter = router({
    getHello: publicProcedure.query(async () => {
        return "Hello";
    }),
    files: filesRouter,
});

export type AppRouter = typeof appRouter;
