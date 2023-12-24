import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Button,
    Textarea,
    Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function EditNote({
    id,
    title,
    description,
    categories,
    isOpen,
    onClose,
    handleEditNote,
}) {
    const [identifier, setIdentifier] = useState(id);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedCategories, setUpdatedCategories] = useState('');

    useEffect(() => {
        setUpdatedTitle(title);
        setUpdatedDescription(description);
        setIdentifier(id);
        setUpdatedCategories(categories.map((category) => category.Name).join(','));
    }, [title, description, id, categories])

    const handleUpdate = (event) => {
        event.preventDefault();

        handleEditNote({
            id: identifier, Title: updatedTitle, Description: updatedDescription, Categories: updatedCategories.split(',').map((category => {
                return {
                    Name: category.trim()
                }
            }))
        });
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <div style={{ marginTop: 10, marginBottom: 10 }}>
                            <label style={{ fontWeight: 500, fontSize: 30, marginTop: 20, marginBottom: 20 }}>Title</label>
                            <Input
                                placeholder='Enter title for the note...'
                                value={updatedTitle}
                                onChange={(event) => setUpdatedTitle(event.target.value)}
                                style={{ paddingTop: 20, paddingBottom: 20 }}
                            />
                        </div>
                        <div style={{ marginTop: 10, marginBottom: 10 }} >
                            <label style={{ fontWeight: 500, fontSize: 30 }}>Description</label>
                            <Textarea
                                value={updatedDescription}
                                placeholder='Enter detailed description note...'
                                onChange={(event) => setUpdatedDescription(event.target.value)}
                            />
                        </div>
                        <div>
                            <label style={{ fontWeight: 500, fontSize: 30 }}>Categories: </label>
                            <Input value={updatedCategories} onChange={((event) => setUpdatedCategories(event.target.value))} />
                            <label><b>Note:</b> Add multiple categories saperated by comma(,).</label>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='green' onClick={handleUpdate}>
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditNote;
