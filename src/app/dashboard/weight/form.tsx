import { useState } from "react";
import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Input,
} from "@chakra-ui/react";
import moment from "moment";

import { trpc } from "../../_trpc/client";

export const CreateWeightForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [weight, setWeight] = useState(0);
    const [date, setDate] = useState<Date>();
    const weightMutation = trpc.createWeight.useMutation();

    const createWeight = async () => {
        await weightMutation.mutate({ weight, logDate: date ? date?.toISOString() : moment().toISOString() });

        setWeight(0);
        setDate(undefined);
        onClose();
    };

    return (
        <>
            <Button onClick={onOpen} colorScheme="green">
                Add Weight
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Weight</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={3} isRequired>
                            <FormLabel>Weight (lb)</FormLabel>
                            <NumberInput min={0} onChange={(value) => setWeight(Number(value))}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl mb={3} isRequired>
                            <FormLabel>Log date</FormLabel>
                            <Input
                                type="date"
                                onChange={(event) => {
                                    setDate(moment(event.target.value).toDate());
                                }}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="green" onClick={createWeight}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
