"use client";

import moment from "moment";
import {
    Flex,
    Heading,
    Stack,
    useColorModeValue,
    Divider,
    Table,
    TableContainer,
    Thead,
    Tr,
    Th,
    Tbody,
    Text,
    Td,
    Skeleton,
    IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import { trpc } from "../../_trpc/client";
import { CreateWeightForm } from "./form";

const Weight = () => {
    const { data: user, isFetching } = trpc.getUser.useQuery();
    const weightMutation = trpc.deleteWeight.useMutation();

    return (
        <>
            <Flex justify="center" bg={useColorModeValue("gray.50", "gray.800")}>
                <Stack
                    spacing={4}
                    w="full"
                    maxW="lg"
                    bg={useColorModeValue("white", "gray.700")}
                    rounded="xl"
                    boxShadow="lg"
                    p={6}
                    my={12}
                >
                    <Heading textAlign="center" color="green.400">
                        Weight
                    </Heading>

                    <Divider />

                    {user?.weights.length ? (
                        <TableContainer>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Weight ({user.settings.weightLb ? "lb" : "kg"})</Th>
                                        <Th>Log date</Th>
                                        <Th />
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {user?.weights.map((weight) => (
                                        <Tr key={weight.id}>
                                            <Td>
                                                <Skeleton isLoaded={!isFetching}>{weight.weight}</Skeleton>
                                            </Td>
                                            <Td>
                                                <Skeleton isLoaded={!isFetching}>
                                                    {moment(weight.logDate).format("MMMM DD, YYYY")}
                                                </Skeleton>
                                            </Td>
                                            <Td textAlign="end">
                                                <Skeleton isLoaded={!isFetching}>
                                                    <IconButton
                                                        icon={<DeleteIcon />}
                                                        aria-label="Delete Icon"
                                                        colorScheme="red"
                                                        onClick={() => weightMutation.mutate({ id: weight.id })}
                                                    />
                                                </Skeleton>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Text align="center">Nothing here, add some data!</Text>
                    )}

                    <Divider />
                    <CreateWeightForm />
                </Stack>
            </Flex>
        </>
    );
};

export default withPageAuthRequired(Weight, { returnTo: "/" });
