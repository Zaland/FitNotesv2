import z from "zod";

import { prisma } from "../../config/prisma";
import { router, authProcedure } from "../trpc";

export const userRouter = router({
    getUser: authProcedure.query(async ({ input, ctx }) => {
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

        return { ...user, settings: { ...settings } };
    }),
});
