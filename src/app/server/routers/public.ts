import { router, publicProcedure } from "../trpc";

// public endpoints that dont require auth
export const publicRouter = router({
    version: publicProcedure.query(() => {
        return "v1.0";
    }),
});
