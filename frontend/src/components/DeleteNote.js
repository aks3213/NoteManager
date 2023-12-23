import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
} from '@chakra-ui/react';
import { humanReadableTime } from '../utils';

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

                    <ModalBody style={{ margin: 10 }}>
                        <h3 style={{ fontWeight: 'bold', fontSize: 30, border: 2, borderColor: 'blue' }}>
                            {note?.Title}
                        </h3>
                        <hr style={{ marginTop: 10, marginBottom: 20, }} />
                        <p style={{ fontSize: 25, margin: 10 }}>
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
