import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
} from '@chakra-ui/react';

function DeleteNote({
    note,
    isOpen,
    onClose,
    handleDeleteNote,
}) {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bgColor={'lightgray'} borderTopRadius={7}>
                        <h2 style={{ fontWeight: 'bold', fontSize: 30, }}>Are you sure you want delete note?</h2>
                    </ModalHeader>

                    <ModalBody>
                        <h3 style={{ fontWeight: 'bold', fontSize: 20, border: 2, borderColor: 'blue', margin: 10 }}>
                            {note?.Title}
                        </h3>
                        <p style={{ margin: 10 }}>
                            {note?.Description}
                        </p>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={handleDeleteNote}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteNote;
