"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { AuthNavbar } from "../components";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUser();

    return (
        <>
            {user && <AuthNavbar />}
            {children}
        </>
    );
};

export default Layout;
