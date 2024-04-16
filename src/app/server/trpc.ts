import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "../api/trpc/[trpc]/route";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const mergeRouters = t.mergeRouters;

export const publicProcedure = t.procedure;

export const authProcedure = t.procedure.use(async ({ ctx, next }) => {
    if (!ctx?.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({
        ctx: {
            user: ctx.user,
        },
    });
});
