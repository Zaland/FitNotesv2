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
    Container,
    Avatar,
    useColorMode,
    Switch,
    Divider,
    useToast,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import { trpc } from "../../_trpc/client";

const Settings = () => {
    const { user: authUser } = useUser();
    const { colorMode } = useColorMode();
    const toast = useToast();

    const { data: user, isLoading } = trpc.getUser.useQuery();
    const userMutation = trpc.updateUser.useMutation({
        onSuccess: () => toast({ title: "User updated", status: "success", isClosable: true }),
        onError: () => toast({ title: "User failed to update", status: "error", isClosable: true }),
    });
    const settingsMutation = trpc.updateSettings.useMutation({
        onSuccess: () => toast({ title: "Settings updated", status: "success", isClosable: true }),
        onError: () => toast({ title: "Settings failed to update", status: "error", isClosable: true }),
    });

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [weightLb, setWeightLb] = useState(user?.settings.weightLb);
    const [goalWeight, setGoalWeight] = useState(user?.settings.goalWeight || 0);
    const [userTouched, setUserTouched] = useState(false);
    const [settingsTouched, setSettingsTouched] = useState(false);

    useEffect(() => {
        handleReset();
    }, [isLoading]);

    const handleReset = () => {
        setName(user?.name);
        setEmail(user?.email);
        setWeightLb(user?.settings.weightLb);
        setGoalWeight(user?.settings.goalWeight || 0);
        setUserTouched(false);
        setSettingsTouched(false);
    };

    const handleUpdate = async () => {
        if (settingsTouched) {
            await settingsMutation.mutate({ weightLb, goalWeight });
            setSettingsTouched(false);
        }

        if (userTouched) {
            await userMutation.mutate({ name, email });
            setUserTouched(false);
        }
    };

    return (
        <>
            <Flex justify="center">
                <Container variant="default">
                    <Stack spacing={4}>
                        <Heading textAlign="center" variant="title">
                            Settings
                        </Heading>
                        <FormControl id="userIcon" textAlign="center">
                            <Avatar
                                size="xl"
                                bg={colorMode === "light" ? "black" : "gray"}
                                src={authUser?.picture || ""}
                            />
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
                        <FormControl>
                            <FormLabel>Goal weight</FormLabel>
                            <NumberInput
                                min={0}
                                onChange={(value) => {
                                    setGoalWeight(Number(value));
                                    setSettingsTouched(true);
                                }}
                                value={goalWeight}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
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
                </Container>
            </Flex>
        </>
    );
};

export default withPageAuthRequired(Settings, { returnTo: "/" });
