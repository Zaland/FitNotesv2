"use client";

import { useState, useEffect } from "react";
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
    Switch,
} from "@chakra-ui/react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import { trpc } from "../../_trpc/client";

const Settings = () => {
    const { user: authUser } = useUser();
    const { colorMode } = useColorMode();
    const { data: user } = trpc.getUser.useQuery();
    const mutation = trpc.updateSettings.useMutation();

    const [darkMode, setDarkMode] = useState(user?.settings.darkMode);
    const [weightLb, setWeightLb] = useState(user?.settings.weightLb);
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        setDarkMode(user?.settings.darkMode);
    }, [user?.settings.darkMode]);

    useEffect(() => {
        setWeightLb(user?.settings.weightLb);
    }, [user?.settings.weightLb]);

    const handleReset = () => {
        setDarkMode(user?.settings.darkMode);
        setWeightLb(user?.settings.weightLb);
        setTouched(false);
    };

    const handleUpdate = async () => {
        await mutation.mutate({ darkMode, weightLb });
        setTouched(false);
    };

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
                    <Heading textAlign="center" color="green.400">
                        Settings
                    </Heading>
                    <FormControl id="userIcon" textAlign="center">
                        <Avatar size="xl" bg={colorMode === "light" ? "black" : "gray"} src={authUser?.picture || ""} />
                    </FormControl>
                    <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder="Name" type="text" value={user?.name || ""} disabled />
                    </FormControl>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input placeholder="Email" type="email" value={user?.email || ""} disabled />
                    </FormControl>
                    <FormControl id="darkMode" isRequired>
                        <FormLabel>Dark mode</FormLabel>
                        <Switch
                            isChecked={darkMode}
                            colorScheme="green"
                            onChange={() => {
                                setDarkMode((prev) => !prev);
                                setTouched(true);
                            }}
                        />
                    </FormControl>
                    <FormControl id="darkMode" isRequired>
                        <FormLabel>Weight in pounds (lb)</FormLabel>
                        <Switch
                            colorScheme="green"
                            isChecked={weightLb}
                            onChange={() => {
                                setWeightLb((prev) => !prev);
                                setTouched(true);
                            }}
                        />
                    </FormControl>
                    <Stack spacing={6} direction={["column", "row"]}>
                        <Button w="full" colorScheme="red" isDisabled={!touched} onClick={handleReset}>
                            Cancel
                        </Button>
                        <Button w="full" colorScheme="green" isDisabled={!touched} onClick={handleUpdate}>
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </>
    );
};

export default withPageAuthRequired(Settings, { returnTo: "/" });
