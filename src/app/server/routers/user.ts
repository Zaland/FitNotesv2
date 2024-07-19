import z from "zod";

import { prisma } from "../../config/prisma";
import { router, authProcedure } from "../trpc";

export const userRouter = router({
    getUser: authProcedure.query(async ({ ctx }) => {
        let user = await prisma.user.findFirst({ where: { email: ctx.user.email } });

        // if user doesn't exist, and they are authed, then add them to the database
        if (!user) {
            user = await prisma.user.create({ data: { email: ctx.user.email, name: ctx.user.name } });
        }

        let settings = await prisma.settings.findFirst({ where: { userId: user.id } });

        // if settings doesn't exist, and they are authed, then add to the database
        if (!settings) {
            settings = await prisma.settings.create({ data: { userId: user.id } });
        }

        const weights = await prisma.weight.findMany({ where: { userId: user.id }, orderBy: [{ logDate: "asc" }] });

        return { ...user, settings: { ...settings }, weights: [...weights] };
    }),
    updateUser: authProcedure
        .input(z.object({ name: z.string().optional(), email: z.string().optional() }))
        .mutation(async ({ input, ctx }) => {
            const updatedUser = await prisma.user.update({
                where: {
                    email: ctx.user.email,
                },
                data: {
                    name: input.name,
                    email: input.email,
                },
            });

            return updatedUser;
        }),
});
