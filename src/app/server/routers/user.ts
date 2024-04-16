import { prisma } from "../../config/prisma";
import z from "zod";

import { router, authProcedure } from "../trpc";

export const userRouter = router({
    getUser: authProcedure.input(z.object({ authId: z.string() })).query(async ({ ctx, input }) => {
        const test = await prisma.user.findFirst({ where: { authId: input.authId } });
        console.log({ ctx, test, input });
        return "test";
    }),
});
