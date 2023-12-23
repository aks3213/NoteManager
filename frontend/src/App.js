import React, { useState, useEffect } from 'react';
import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import './App.css';
import { getNotes } from './service/NoteService';
import Note from './components/Note';
import EditNote from './components/EditNote';
import DeleteNote from './components/DeleteNote';

function App() {
  const [idToNoteMap, setIdToNoteMap] = useState({});
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const editNoteModal = useDisclosure();
  const deleteNoteModal = useDisclosure();

  const openEditNoteModal = (id) => {
    deleteNoteModal.onClose();
    setSelectedNoteId(id);
    editNoteModal.onOpen();
  }

  const openDeleteNoteModal = (id) => {
    editNoteModal.onClose();
    setSelectedNoteId(id);
    deleteNoteModal.onOpen();
  }

  const handleDeleteNote = () => {
    console.log('delete note', selectedNoteId)

    deleteNoteModal.onClose();
  }
  const handleEditNote = () => {
    console.log('edit note', selectedNoteId);

    editNoteModal.onClose();
  }

  useEffect(() => {
    // Fetch notes from the backend API
    getNotes()
      .then(response => {
        const idToNoteMapTemp = {};
        response.Notes?.forEach((note) => idToNoteMapTemp[note.id] = note);
        setIdToNoteMap(idToNoteMapTemp)
      })
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  return (
    <ChakraProvider>
      <EditNote isOpen={editNoteModal.isOpen} onClose={editNoteModal.onClose} onOpen={editNoteModal.onOpen} handleEditNote={handleEditNote} note={idToNoteMap[selectedNoteId]} />
      <DeleteNote isOpen={deleteNoteModal.isOpen} onClose={deleteNoteModal.onClose} onOpen={deleteNoteModal.onOpen} handleDeleteNote={handleDeleteNote} note={idToNoteMap[selectedNoteId]} />

      <ul style={{ alignItems: 'center', padding: 10, maxWidth: 700 }}>
        {Object.keys(idToNoteMap)?.map((id) => (
          <li key={id}>
            <Note note={idToNoteMap[id]} openDeleteNoteModal={openDeleteNoteModal} openEditNoteModal={openEditNoteModal} />
          </li>
        ))}
      </ul>
      <text>hello</text>
    </ChakraProvider>
  );
}

export default App;
