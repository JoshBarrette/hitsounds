import { publicProcedure, router } from "./trpc";
import { filesRouter } from "./Routers/files";
import { searchRouter } from "./Routers/search";

export const appRouter = router({
    getHello: publicProcedure.query(async () => {
        return "Hello";
    }),
    files: filesRouter,
    search: searchRouter,
});

export type AppRouter = typeof appRouter;
