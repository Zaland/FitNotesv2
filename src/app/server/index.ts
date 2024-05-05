import { mergeRouters } from "./trpc";
import { publicRouter, userRouter, settingsRouter, weightRouter } from "./routers";

export const appRouter = mergeRouters(publicRouter, userRouter, settingsRouter, weightRouter);

export type AppRouter = typeof appRouter;
