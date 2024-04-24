import { mergeRouters } from "./trpc";
import { publicRouter, userRouter, settingsRouter } from "./routers";

export const appRouter = mergeRouters(publicRouter, userRouter, settingsRouter);

export type AppRouter = typeof appRouter;
