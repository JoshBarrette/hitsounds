import { TRPCError, initTRPC } from "@trpc/server";
import { db } from "~/server/db";
import superjson from "superjson";
import { ZodError } from "zod";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

interface UserProps {
    user: User | null;
}

export const createContextInner = ({ user }: UserProps) => {
    return {
        user,
        db,
    };
};

export const createContext = async (req: NextRequest) => {
    async function getUser() {
        const { userId } = getAuth(req);
        return userId ? await clerkClient.users.getUser(userId) : null;
    }

    return createContextInner({ user: await getUser() });
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

const isAuthorized = t.middleware(({ next, ctx }) => {
    if (!ctx.user?.id) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return next({
      ctx: {
        auth: ctx.user,
      },
    })
  })

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthorized)
