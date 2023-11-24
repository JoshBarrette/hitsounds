import { initTRPC } from "@trpc/server";
import { db } from "~/server/db";
import superjson from "superjson";

export const createContext = () => {
    return {
        db,
    };
};

const t = initTRPC.context<typeof createContext>().create({
    transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
