import z from "zod";

import { prisma } from "../../config/prisma";
import { router, authProcedure } from "../trpc";

export const settingsRouter = router({
    updateSettings: authProcedure
        .input(z.object({ weightLb: z.boolean().optional() }))
        .mutation(async ({ input, ctx }) => {
            const updatedUser = await prisma.user.update({
                where: {
                    email: ctx.user.email,
                },
                data: {
                    settings: {
                        update: {
                            where: {
                                userId: ctx.user.userId,
                            },
                            data: {
                                weightLb: input.weightLb,
                            },
                        },
                    },
                },
                include: {
                    settings: true,
                },
            });

            return updatedUser;
        }),
});
