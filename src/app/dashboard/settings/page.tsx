"use client";

import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    useColorMode,
} from "@chakra-ui/react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const Settings = () => {
    const { user } = useUser();
    const { colorMode } = useColorMode();

    return (
        <>
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
                >
                    <Heading>Settings</Heading>
                    <FormControl id="userIcon">
                        <Avatar size="xl" bg={colorMode === "light" ? "black" : "gray"} src={user?.picture || ""} />
                    </FormControl>
                    <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder="Name" type="text" value={user?.name || ""} disabled />
                    </FormControl>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input placeholder="Email" type="email" value={user?.email || ""} disabled />
                    </FormControl>
                    <Stack spacing={6} direction={["column", "row"]}>
                        <Button w="full" isDisabled>
                            Cancel
                        </Button>
                        <Button w="full" isDisabled>
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </>
    );
};

export default withPageAuthRequired(Settings, { returnTo: "/" });
