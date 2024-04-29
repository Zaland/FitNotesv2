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
    Td,
} from "@chakra-ui/react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import { trpc } from "../../_trpc/client";

const Weight = () => {
    const { data: user, isLoading } = trpc.getUser.useQuery();

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

                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Weight (lb)</Th>
                                    <Th>Log date</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {user?.weights.map((weight) => (
                                    <Tr key={weight.logDate}>
                                        <Td>{weight.weight}</Td>
                                        <Td>{moment(weight.logDate).format("h:mm:ss a - MMMM DD, YYYY")}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    <Divider />
                </Stack>
            </Flex>
        </>
    );
};

export default withPageAuthRequired(Weight, { returnTo: "/" });
