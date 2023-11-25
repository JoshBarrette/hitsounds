import { appRouter } from "~/server";
import { db } from "~/server/db";

export const serverClient = appRouter.createCaller({
    db: db,
    user: null,
});
