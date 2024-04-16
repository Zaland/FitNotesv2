import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { getSession } from "@auth0/nextjs-auth0";

import { appRouter } from "../../../server";

const createTRPCContext = async () => {
    const session = await getSession();

    return { user: session?.user };
};

const handler = (req: Request) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: createTRPCContext,
    });

export { handler as GET, handler as POST, handler as PATCH, handler as PUT, handler as DELETE };

export type Context = typeof createTRPCContext;
