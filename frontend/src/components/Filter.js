import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Select,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { populateArchiveFilter } from '../utils';

function Filter({
    setFilter,
    filter,
    isOpen,
    onClose,
}) {
    const [archived, setArchived] = useState('All');

    useEffect(() => {
        setArchived(populateArchiveFilter(filter));
    }, [filter])

    const applyFilter = () => {
        const filtersTemp = {}
        if (archived === 'Archived') {
            filtersTemp.isArchived = true;
        } else if (archived === 'Unarchived') {
            filtersTemp.isArchived = false;
        }

        setFilter(filtersTemp);
    }

    const resetFilter = () => {
        setFilter({});
    }

    const handleArchiveFilterChange = (event) => {
        setArchived(event.target.value);
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bgColor={'lightblue'} borderTopRadius={7}>
                        <h2 style={{ fontWeight: 'bold', fontSize: 30, }}>Filter notes</h2>
                    </ModalHeader>
                    <ModalBody style={{ margin: 10 }}>
                        <Select variant='outline' defaultValue={archived} onChange={handleArchiveFilterChange} >
                            <option value='All'>All</option>
                            <option value='Archived'>Archived</option>
                            <option value='Unarchived'>Unarchived</option>
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='gray' mr={3} onClick={resetFilter}>
                            Reset
                        </Button>
                        <Button colorScheme='blue' onClick={applyFilter}>
                            Apply
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export default Filter;
