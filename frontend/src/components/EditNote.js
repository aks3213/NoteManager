import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Button,
} from '@chakra-ui/react';

function EditNote({
    note,
    isOpen,
    onClose,
    handleEditNote,
}) {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
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
                            Close
                        </Button>
                        <Button colorScheme='green' onClick={handleEditNote}>
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditNote;
