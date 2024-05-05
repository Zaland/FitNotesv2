import { useState } from "react";
import {
    useDisclosure,
    Button,
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
import { Modal } from "./modal";

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

            <Modal isOpen={isOpen} title="Add Weight" onSubmit={createWeight} onClose={onClose}>
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
                <FormControl mb={3}>
                    <FormLabel>Log date</FormLabel>
                    <Input
                        type="date"
                        onChange={(event) => {
                            setDate(moment(event.target.value).toDate());
                        }}
                    />
                </FormControl>
            </Modal>
        </>
    );
};
