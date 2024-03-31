"use client";

import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
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
            <Flex justify="center" bg={useColorModeValue("gray.50", "gray.800")}>
                <Stack
                    spacing={4}
                    w="full"
                    maxW="md"
                    bg={useColorModeValue("white", "gray.700")}
                    rounded="xl"
                    boxShadow="lg"
                    p={6}
                    my={12}
                    align="center"
                >
                    <Text>Welcome to FitNotes</Text>
                </Stack>
            </Flex>
        </>
    );
};

export default Page;
