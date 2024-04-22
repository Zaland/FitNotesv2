import z from "zod";

import { prisma } from "../../config/prisma";
import { router, authProcedure } from "../trpc";

export const userRouter = router({
    getUser: authProcedure.input(z.object({ email: z.string(), name: z.string() })).query(async ({ input }) => {
        let user = await prisma.user.findFirst({ where: { email: input.email } });

        // if user doesn't exist, and they are authed, then add them to the database
        if (!user) {
            user = await prisma.user.create({ data: { email: input.email, name: input.name } });
        }

        let settings = await prisma.settings.findFirst({ where: { userId: user.id } });

        // if settings doesn't exist, and they are authed, then add to the database
        if (!settings) {
            settings = await prisma.settings.create({ data: { userId: user.id } });
        }

        return { ...user, ...settings };
    }),
});
