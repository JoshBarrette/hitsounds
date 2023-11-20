import { initTRPC } from "@trpc/server";
import { db } from "~/server/db";

export const createContext = () => {
    return {
        db,
    };
};

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
