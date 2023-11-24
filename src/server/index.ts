import { router } from "./trpc";
import { filesRouter } from "./Routers/files";
import { searchRouter } from "./Routers/search";
import { profileRouter } from "./Routers/profile";

export const appRouter = router({
    files: filesRouter,
    search: searchRouter,
    profile: profileRouter,
});

export type AppRouter = typeof appRouter;

function getBaseUrl() {
    if (typeof window !== "undefined") return "";
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
  }
  
  export function getUrl() {
    return getBaseUrl() + "/api/trpc";
  }
  