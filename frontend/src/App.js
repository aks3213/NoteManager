import React, { useState, useEffect } from 'react';
import {
  ChakraProvider, useDisclosure, Button,
} from '@chakra-ui/react';
import './App.css';
import { getNotes, deleteNote, createNote, updateNote } from './service/NoteService';
import Note from './components/Note';
import EditNote from './components/EditNote';
import DeleteNote from './components/DeleteNote';
import CreateNote from './components/CreateNote';
const emptyNote = { id: '', Title: '', Description: '', IsArchived: false, createdAt: 0, updatedAt: 0 };
function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(emptyNote);
  const editNoteModal = useDisclosure();
  const deleteNoteModal = useDisclosure();
  const createNoteModal = useDisclosure();

  const openEditNoteModal = (note) => {
    deleteNoteModal.onClose();
    createNoteModal.onClose();
    setSelectedNote(note);
    editNoteModal.onOpen();
  }

  const openDeleteNoteModal = (note) => {
    editNoteModal.onClose();
    createNoteModal.onClose();
    setSelectedNote(note);
    deleteNoteModal.onOpen();
  }

  const openCreateNoteModal = () => {
    deleteNoteModal.onClose();
    editNoteModal.onClose();
    createNoteModal.onOpen();
  }

  const handleDeleteNote = () => {
    deleteNote(selectedNote.id).then(() => {
      const temp = notes.filter((note) => note.id !== selectedNote.id)
      setNotes(temp);
      setSelectedNote(emptyNote);
    }).then(() =>
      deleteNoteModal.onClose()
    )
  }

  const handleEditNote = (note) => {
    updateNote(note).then((response) => {
      let temp = notes.filter((note) => note.id !== selectedNote.id)
      temp = [response.data, ...temp];
      setNotes(temp);
      setSelectedNote(emptyNote);
    })
    editNoteModal.onClose();
  }

  const handleCreateNote = (note) => {
    createNote(note).then((response) => {
      const idToNoteMapTemp = [response.data, ...notes];
      setNotes(idToNoteMapTemp);
      createNoteModal.onClose();
    })
  }

  useEffect(() => {
    // Fetch notes from the backend API
    getNotes()
      .then(response => {
        setNotes(response.Notes)
      })
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  return (
    <ChakraProvider>
      <div style={{ background: 'lightblue', }}>
        <h1 style={{ fontWeight: 'bold', fontSize: 50, marginLeft: 30 }}>Notes</h1>
      </div>
      <div style={{ maxWidth: 700, padding: 30 }}>
        <CreateNote isOpen={createNoteModal.isOpen} onClose={createNoteModal.onClose} onOpen={createNoteModal.onOpen} handleCreateNote={handleCreateNote} />
        <EditNote isOpen={editNoteModal.isOpen} onClose={editNoteModal.onClose} onOpen={editNoteModal.onOpen} handleEditNote={handleEditNote} id={selectedNote.id} title={selectedNote.Title} description={selectedNote.Description} />
        <DeleteNote isOpen={deleteNoteModal.isOpen} onClose={deleteNoteModal.onClose} onOpen={deleteNoteModal.onOpen} handleDeleteNote={handleDeleteNote} note={selectedNote} />
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button alignSelf={'end'} onClick={openCreateNoteModal}>New note</Button>
        </div>
        <ul style={{ listStyleType: 'none' }}>
          {notes?.map((note) => (
            <li key={note.id}>
              <Note note={note} openDeleteNoteModal={openDeleteNoteModal} openEditNoteModal={openEditNoteModal} />
            </li>
          ))}
        </ul>
      </div>
    </ChakraProvider >
  );
}

export default App;
