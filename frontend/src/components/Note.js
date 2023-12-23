import { EditIcon, DeleteIcon, } from '@chakra-ui/icons'

function Note({
    note,
    openDeleteNoteModal,
    openEditNoteModal,
}) {
    console.log('-------------', note)
    return (
        <div style={{ borderRadius: 5, borderWidth: 2, margin: 20, padding: 20, alignSelf: 'center', background: note.IsArchived ? 'lightgray' : 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontWeight: 'bold', fontSize: 30 }}>{note.Title}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: 90 }}>
                    <EditIcon boxSize={8} color={'lightblue'} onClick={() => openEditNoteModal(note.id)} />
                    <DeleteIcon boxSize={8} color={'#ad260a'} onClick={() => openDeleteNoteModal(note.id)} />
                </div>
            </div>
            <hr style={{ marginTop: 10, marginBottom: 20, }} />
            <p style={{ fontSize: 20, margin: 10 }}>
                {
                    note.Description?.length > 100 ? `${note.Description.substring(0, 100)}...` : note.Description
                }
            </p>
        </div >
    )
}

export default Note;