import z from "zod";

import { prisma } from "../../config/prisma";
import { router, authProcedure } from "../trpc";

export const weightRouter = router({
    createWeight: authProcedure
        .input(z.object({ weight: z.number(), logDate: z.string().optional() }))
        .mutation(async ({ input, ctx }) => {
            const user = await prisma.user.findFirst({ where: { email: ctx.user.email } });

            if (user) {
                await prisma.weight.create({
                    data: {
                        weight: input.weight,
                        logDate: input.logDate,
                        userId: user.id,
                    },
                });
            }
        }),
    deleteWeight: authProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
        await prisma.weight.delete({ where: { id: input.id } });
    }),
});
