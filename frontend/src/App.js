import React, { useState, useEffect } from 'react';
import {
  ChakraProvider, useDisclosure, Button,
} from '@chakra-ui/react';
import { CiFilter } from "react-icons/ci";
import './App.css';
import { getNotes, deleteNote, createNote, updateNote } from './service/NoteService';
import Note from './components/Note';
import EditNote from './components/EditNote';
import DeleteNote from './components/DeleteNote';
import CreateNote from './components/CreateNote';
import ArchiveNote from './components/ArchiveNote';
import Filter from './components/Filter';

const emptyNote = { id: '', Title: '', Description: '', IsArchived: false, createdAt: 0, updatedAt: 0 };
function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(emptyNote);
  const [filter, setFilter] = useState({});
  const editNoteModal = useDisclosure();
  const deleteNoteModal = useDisclosure();
  const archiveNoteModal = useDisclosure();
  const createNoteModal = useDisclosure();
  const filterModal = useDisclosure();

  const openEditNoteModal = (note) => {
    setSelectedNote(note);
    editNoteModal.onOpen();
  }

  const openDeleteNoteModal = (note) => {
    setSelectedNote(note);
    deleteNoteModal.onOpen();
  }

  const openCreateNoteModal = () => {
    createNoteModal.onOpen();
  }

  const handleFilterModal = () => {
    filterModal.onOpen();
  }

  const openArchiveNoteModal = (note) => {
    deleteNoteModal.onClose();
    editNoteModal.onClose();
    createNoteModal.onClose();
    setSelectedNote(note);
    archiveNoteModal.onOpen();
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

  const handleArchiveNote = () => {
    updateNote({ ...selectedNote, IsArchived: !selectedNote.IsArchived }).then((response) => {
      let temp = notes.filter((note) => note.id !== selectedNote.id)
      temp = [response.data, ...temp];
      setNotes(temp);
      setSelectedNote(emptyNote);
      archiveNoteModal.onClose();
    })
  }

  useEffect(() => {
    console.log('filter ', filter)
    getNotes(filter)
      .then(response => {
        setNotes(response.Notes)
        setFilter(filter);
        filterModal.onClose();
      })
      .catch(error => console.error('Error fetching notes:', error));
  }, [filter,]);

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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{ background: 'lightblue', width: '100%' }}>
          <h1 style={{ fontWeight: 'bold', fontSize: 50, marginLeft: 30 }}>Notes</h1>
        </div>
        <div style={{ width: 700, padding: 30, }}>
          <CreateNote isOpen={createNoteModal.isOpen} onClose={createNoteModal.onClose} onOpen={createNoteModal.onOpen} handleCreateNote={handleCreateNote} />
          <EditNote isOpen={editNoteModal.isOpen} onClose={editNoteModal.onClose} onOpen={editNoteModal.onOpen} handleEditNote={handleEditNote} id={selectedNote.id} title={selectedNote.Title} description={selectedNote.Description} categories={selectedNote.Categories ? selectedNote.Categories : []} />
          <DeleteNote isOpen={deleteNoteModal.isOpen} onClose={deleteNoteModal.onClose} onOpen={deleteNoteModal.onOpen} handleDeleteNote={handleDeleteNote} note={selectedNote} />
          <ArchiveNote isOpen={archiveNoteModal.isOpen} onClose={archiveNoteModal.onClose} onOpen={archiveNoteModal.onOpen} handleArchiveNote={handleArchiveNote} note={selectedNote} />
          <Filter setFilter={setFilter} filter={filter} isOpen={filterModal.isOpen} onClose={filterModal.onClose} onOpen={filterModal.onOpen} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button alignSelf={'end'} onClick={openCreateNoteModal} colorScheme='green'>New note</Button>
            <CiFilter size={36} style={{ marginRight: 10 }} onClick={handleFilterModal} />
          </div>
          <ul style={{ listStyleType: 'none' }}>
            {notes?.map((note) => (
              <li key={note.id}>
                <Note note={note} openDeleteNoteModal={openDeleteNoteModal} openEditNoteModal={openEditNoteModal} openArchiveNoteModal={openArchiveNoteModal} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ChakraProvider >
  );
}

export default App;
