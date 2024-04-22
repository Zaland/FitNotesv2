"use client";

import { Stack, Text, Box, Heading, Container } from "@chakra-ui/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";

import { Navbar } from "./components";

const Page = () => {
    const { user } = useUser();

    if (user) {
        redirect("/dashboard");
    }

    return (
        <>
            <Navbar />
            <Container maxW="3xl">
                <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
                    <Heading fontWeight={600} fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }} lineHeight="110%">
                        Track your workouts <br />
                        <Text as="span" color="green.400">
                            Make progress
                        </Text>
                    </Heading>
                </Stack>
            </Container>
        </>
    );
};

export default Page;
