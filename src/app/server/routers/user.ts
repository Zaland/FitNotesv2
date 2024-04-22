import z from "zod";

import { prisma } from "../../config/prisma";
import { router, authProcedure } from "../trpc";

export const userRouter = router({
    getUser: authProcedure.input(z.object({ email: z.string(), name: z.string() })).query(async ({ input }) => {
        const user = await prisma.user.findFirst({ where: { email: input.email } });

        // if user doesn't exist, and they are authed, then add them to the database
        if (!user) {
            const addedUser = await prisma.user.create({ data: { email: input.email, name: input.name } });

            return addedUser;
        }

        return user;
    }),
});
