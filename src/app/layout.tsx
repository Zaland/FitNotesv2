import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Providers } from "./providers";
import { TRPCProvider } from "./_trpc/provider";

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang="en">
        <UserProvider>
            <TRPCProvider>
                <body>
                    <Providers>{children}</Providers>
                </body>
            </TRPCProvider>
        </UserProvider>
    </html>
);

export default RootLayout;
