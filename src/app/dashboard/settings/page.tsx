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
    Divider,
    useToast,
} from "@chakra-ui/react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import { trpc } from "../../_trpc/client";

const Settings = () => {
    const { user: authUser } = useUser();
    const { colorMode } = useColorMode();
    const toast = useToast();

    const { data: user, isLoading } = trpc.getUser.useQuery();
    const userMutation = trpc.updateUser.useMutation({
        onSuccess: () => toast({ title: "User updated", status: "success", duration: 5000, isClosable: true }),
        onError: () => toast({ title: "User failed to update", status: "error", duration: 5000, isClosable: true }),
    });
    const settingsMutation = trpc.updateSettings.useMutation({
        onSuccess: () => toast({ title: "Settings updated", status: "success", duration: 5000, isClosable: true }),
        onError: () => toast({ title: "Settings failed to update", status: "error", duration: 5000, isClosable: true }),
    });

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [weightLb, setWeightLb] = useState(user?.settings.weightLb);
    const [userTouched, setUserTouched] = useState(false);
    const [settingsTouched, setSettingsTouched] = useState(false);

    useEffect(() => {
        handleReset();
    }, [isLoading]);

    const handleReset = () => {
        setName(user?.name);
        setEmail(user?.email);
        setWeightLb(user?.settings.weightLb);
        setUserTouched(false);
        setSettingsTouched(false);
    };

    const handleUpdate = async () => {
        if (settingsTouched) {
            await settingsMutation.mutate({ weightLb });
            setSettingsTouched(false);
        }

        if (userTouched) {
            await userMutation.mutate({ name, email });
            setUserTouched(false);
        }
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
                    <FormControl id="name">
                        <FormLabel>Name</FormLabel>
                        <Input
                            placeholder="Name"
                            type="text"
                            value={name || ""}
                            onChange={(event) => {
                                setName(event.target.value);
                                setUserTouched(true);
                            }}
                        />
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                            placeholder="Email"
                            type="email"
                            value={email || ""}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setUserTouched(true);
                            }}
                        />
                    </FormControl>
                    <FormControl id="darkMode">
                        <FormLabel htmlFor="weight">Weight unit</FormLabel>
                        <FormLabel display="inline" color={!weightLb ? "gray.200" : "gray.500"}>
                            kg
                        </FormLabel>
                        <Switch
                            id="weight"
                            colorScheme="green"
                            isChecked={weightLb}
                            size="lg"
                            onChange={() => {
                                setWeightLb((prev) => !prev);
                                setSettingsTouched(true);
                            }}
                        />
                        <FormLabel display="inline" ml={3} color={weightLb ? "gray.200" : "gray.500"}>
                            lb
                        </FormLabel>
                    </FormControl>
                    <Divider />
                    <Stack spacing={6} direction={["column", "row"]}>
                        <Button
                            w="full"
                            colorScheme="red"
                            isDisabled={!userTouched && !settingsTouched}
                            onClick={handleReset}
                        >
                            Cancel
                        </Button>
                        <Button
                            w="full"
                            colorScheme="green"
                            isDisabled={!userTouched && !settingsTouched}
                            onClick={handleUpdate}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </>
    );
};

export default withPageAuthRequired(Settings, { returnTo: "/" });
