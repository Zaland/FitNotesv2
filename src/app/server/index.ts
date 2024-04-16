import { mergeRouters } from "./trpc";
import { publicRouter, userRouter } from "./routers";

export const appRouter = mergeRouters(publicRouter, userRouter);

export type AppRouter = typeof appRouter;
