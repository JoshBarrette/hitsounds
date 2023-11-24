import { initTRPC } from "@trpc/server";
import { db } from "~/server/db";
import superjson from "superjson";
import { ZodError } from "zod";

export const createContext = () => {
    return {
        db,
    };
};

const t = initTRPC.context<typeof createContext>().create({
    isServer: true,
    allowOutsideOfServer: true,
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        };
    },
});

export const router = t.router;
export const publicProcedure = t.procedure;
