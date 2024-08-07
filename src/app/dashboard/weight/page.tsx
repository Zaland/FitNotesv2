"use client";

import { useState } from "react";
import moment from "moment";
import {
    Flex,
    Heading,
    Container,
    Stack,
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
    useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import { trpc } from "../../_trpc/client";
import { CreateWeightForm } from "./form";
import { Modal } from "./modal";

const Weight = () => {
    const { data: user, isFetching } = trpc.getUser.useQuery();
    const weightMutation = trpc.deleteWeight.useMutation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentWeight, setCurrentWeight] = useState(0);

    return (
        <>
            <Flex justify="center">
                <Container variant="default">
                    <Stack spacing={4}>
                        <Heading textAlign="center" variant="title">
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
                                                            onClick={() => {
                                                                setCurrentWeight(weight.id);
                                                                onOpen();
                                                            }}
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
                </Container>
            </Flex>

            <Modal
                isOpen={isOpen}
                title="Delete"
                submitLabel="Confirm"
                cancelLabel="Cancel"
                onSubmit={() => weightMutation.mutate({ id: currentWeight })}
                onClose={onClose}
            >
                <Text>Are you sure you want to delete this log?</Text>
            </Modal>
        </>
    );
};

export default withPageAuthRequired(Weight, { returnTo: "/" });
