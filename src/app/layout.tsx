import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Providers } from "./providers";

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang="en">
        <UserProvider>
            <body>
                <Providers>{children}</Providers>
            </body>
        </UserProvider>
    </html>
);

export default RootLayout;
