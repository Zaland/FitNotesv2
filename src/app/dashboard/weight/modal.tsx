import {
    Modal as ModalChakra,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
} from "@chakra-ui/react";

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
    title?: string;
    submitLabel?: string;
    cancelLabel?: string;
    onSubmit: () => void;
    onClose: () => void;
}

export const Modal = ({ children, isOpen, title, submitLabel, cancelLabel, onSubmit, onClose }: Props) => {
    return (
        <ModalChakra isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        {cancelLabel || "Close"}
                    </Button>
                    <Button
                        colorScheme="green"
                        onClick={() => {
                            onSubmit();
                            onClose();
                        }}
                    >
                        {submitLabel || "Submit"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </ModalChakra>
    );
};
