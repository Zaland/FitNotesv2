"use client";

import { Navbar } from "./components/navbar/Navbar";
import { AuthNavbar } from "./components/navbar/AuthNavbar";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Page() {
    const { user } = useUser();

    return (
        <>
            {user ? <AuthNavbar /> : <Navbar />}
            <a href="/api/auth/login">Test</a>
        </>
    );
}
