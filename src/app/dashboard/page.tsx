"use client";

import { Flex, Stack, Heading, useColorModeValue } from "@chakra-ui/react";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0/client";
import { trpc } from "../_trpc/client";

const Dashboard = () => {
    const { user } = useUser();

    const { data: lis, error } = trpc.getUser.useQuery();
    // const { data: list } = trpc.updateSettings.useQuery({ darkMode: true, weightLb: true });

    console.log({ lis, error, user });

    return (
        <Flex justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
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
                <Heading>Dashboard</Heading>
            </Stack>
        </Flex>
    );
};

export default withPageAuthRequired(Dashboard, { returnTo: "/" });
