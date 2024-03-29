"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { AuthNavbar, Navbar } from "./components";

const Page = () => {
    const { user } = useUser();

    return (
        <>
            {user ? <AuthNavbar /> : <Navbar />}
            <a href="/api/auth/login">Test</a>
        </>
    );
};

export default Page;
