const { Note } = require('../models');

async function getAllNotes() {
    return await Note.findAll();
}

async function getNoteById(id) {
    return await Note.findOne({
        where: {
            id: id
        }
    });
}

async function createNote(note) {
    return await Note.create(note)
}

async function deleteNote(id) {
    return await Note.destroy({
        where: {
            id: id,
        },
    });
}

async function updateNote(id, note) {
    return await Note.update(
        {
            ...note,
        },
        {
            where: {
                id: id,
            }
        },
    )
}

module.exports = {
    getAllNotes: getAllNotes,
    createNote: createNote,
    deleteNote: deleteNote,
    getNoteById: getNoteById,
    updateNote: updateNote,
}
