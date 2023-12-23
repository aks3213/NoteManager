import { EditIcon, DeleteIcon, } from '@chakra-ui/icons';

function Note({
    note,
    openDeleteNoteModal,
    openEditNoteModal,
}) {
    return (
        <div style={{ borderRadius: 5, borderWidth: 2, marginTop: 10, marginBottom: 10, padding: 20, alignSelf: 'center', background: note.IsArchived ? 'lightgray' : 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontWeight: 'bold', fontSize: 30 }}>{note.Title}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: 90 }}>
                    <EditIcon boxSize={8} color={'lightblue'} onClick={() => openEditNoteModal(note)} />
                    <DeleteIcon boxSize={8} color={'#ad260a'} onClick={() => openDeleteNoteModal(note)} />
                </div>
            </div>
            <hr style={{ marginTop: 10, marginBottom: 20, }} />
            <p style={{ fontSize: 25, margin: 10 }}>
                {
                    note.Description?.length > 100 ? `${note.Description.substring(0, 100)}...` : note.Description
                }
            </p>
            <label>Last updated: {note.updatedAt}</label>
        </div >
    )
}

export default Note;
