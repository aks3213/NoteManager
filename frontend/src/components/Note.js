import { EditIcon, DeleteIcon, } from '@chakra-ui/icons';
import {
    Button,
} from '@chakra-ui/react';

function Note({
    note,
    openDeleteNoteModal,
    openEditNoteModal,
    openArchiveNoteModal,
}) {
    return (
        <div style={{ borderRadius: 5, borderWidth: 2, marginTop: 10, marginBottom: 10, padding: 20, alignSelf: 'center', background: note.IsArchived ? 'lightgray' : 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontWeight: 'bold', fontSize: 30, width: '75%' }}>{note.Title}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: 160, alignItems: 'center', width: '25%' }}>
                    <Button height={6} onClick={() => openArchiveNoteModal(note)} style={{ width: 85, background: note.IsArchived ? '#a1065d' : 'lightgray', color: note.IsArchived ? 'white' : 'black' }} >
                        {note.IsArchived ? 'Unarchive' : 'Archive'}
                    </Button>
                    <EditIcon boxSize={6} color={'#51a3d6'} onClick={() => openEditNoteModal(note)} />
                    <DeleteIcon boxSize={6} color={'#ab4949'} onClick={() => openDeleteNoteModal(note)} />
                </div>
            </div>
            <hr style={{ marginTop: 10, marginBottom: 20, }} />
            <p style={{ fontSize: 25, margin: 10 }}>
                {
                    note.Description?.length > 100 ? `${note.Description.substring(0, 100)}...` : note.Description
                }
            </p>
            <label style={{ fontWeight: 500 }}>Last updated: </label><text>{note.updatedAt}</text>
        </div >
    )
}

export default Note;
