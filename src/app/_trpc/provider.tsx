"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

import { trpc } from "./client";

export const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({});
    const trpcClient = trpc.createClient({
        links: [
            httpBatchLink({
                url: "http://localhost:3000/api/trpc",
            }),
        ],
    });

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
};
