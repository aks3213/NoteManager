import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Select,
    Input,
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
    const [categories, setCategories] = useState('');

    useEffect(() => {
        setArchived(populateArchiveFilter(filter));
        setCategories(filter.categories);
    }, [filter,])

    const applyFilter = () => {
        const filtersTemp = {}
        if (archived === 'Archived') {
            filtersTemp.isArchived = true;
        } else if (archived === 'Unarchived') {
            filtersTemp.isArchived = false;
        }
        if (categories.length > 0) {
            filtersTemp.categories = categories;
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
                        <label>Filter by Archive:</label>
                        <Select variant='outline' defaultValue={archived} onChange={handleArchiveFilterChange} >
                            <option value='All'>All</option>
                            <option value='Archived'>Archived</option>
                            <option value='Unarchived'>Unarchived</option>
                        </Select>
                        <label>Filter by categories: </label>
                        <Input value={categories} onChange={((event) => setCategories(event.target.value))} />
                        <label><b>Note:</b> Add multiple categories saperated by comma(,).</label>
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
