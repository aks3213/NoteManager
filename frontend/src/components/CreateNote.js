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
import { useState } from 'react';

function CreateNote({
    isOpen,
    onClose,
    handleCreateNote,
}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();

        handleCreateNote({
            Title: title, Description: description, Categories: categories.split(',').map((category => {
                return {
                    Name: category.trim()
                }
            }))
        });
        setTitle('');
        setDescription('')
        setCategories('');
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
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                style={{ paddingTop: 20, paddingBottom: 20 }}
                            />
                        </div>
                        <div style={{ marginTop: 10, marginBottom: 10 }} >
                            <label style={{ fontWeight: 500, fontSize: 30 }}>Description</label>
                            <Textarea
                                value={description}
                                placeholder='Enter detailed description note...'
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                        <div>
                            <label style={{ fontWeight: 500, fontSize: 30 }}>Categories: </label>
                            <Input value={categories} onChange={((event) => setCategories(event.target.value))} />
                            <label><b>Note:</b> Add multiple categories saperated by comma(,).</label>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='green' onClick={handleSubmit}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export default CreateNote;
