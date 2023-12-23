import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
} from '@chakra-ui/react';

function ArchiveNote({
    note,
    isOpen,
    onClose,
    handleArchiveNote,
}) {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bgColor={'lightgray'} borderTopRadius={7}>
                        <h2 style={{ fontWeight: 'bold', fontSize: 30, }}>
                            {note.IsArchived ? `Are you sure you want unarchive this note?` : `Are you sure you want archive this note?`}
                        </h2>
                    </ModalHeader>

                    <ModalBody style={{ margin: 10 }}>
                        <h3 style={{ fontWeight: 'bold', fontSize: 30, border: 2, borderColor: 'blue' }}>
                            {note.Title}
                        </h3>
                        <hr style={{ marginTop: 10, marginBottom: 20, }} />
                        <p style={{ fontSize: 25, margin: 10 }}>
                            {note.Description}
                        </p>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='white' color='black' mr={3} onClick={onClose} borderColor='#ab260c' borderWidth={1}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue' onClick={handleArchiveNote}>
                            {note.IsArchived ? `Unarchive` : `Archive`}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ArchiveNote;
