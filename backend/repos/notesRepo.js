const { Note } = require('../models');

async function getAllNotes(filter) {
    console.log('executing getAllNotes with possible filter: ', filter);

    const params = {
        where: filter,
    }
    console.log('params: ', params);

    const findAllRes = await Note.findAll(params);

    console.log('find all with filter res: ', findAllRes);
    return findAllRes;
}

async function getNoteById(id) {
    console.log('executing getNoteById: ', id);

    const findOneRes = await Note.findOne({
        where: {
            id: id
        }
    });

    console.log('find one by id res: ', findOneRes);

    return findOneRes;
}

async function createNote(note) {
    console.log('executing createNote: ', note);

    const createNoteRes = await Note.create(note);

    console.log('create note res: ', createNoteRes);

    return createNoteRes.dataValues;
}

async function deleteNote(id) {
    console.log('executing deleteNote: ', id);

    const deleteRes = await Note.destroy({
        where: {
            id: id,
        },
    });

    console.log('delete note res: ', deleteRes);

    return deleteRes;
}

async function updateNote(id, note) {
    console.log('executing updateNote: ', id, note);

    const updateNoteRes = await Note.update(
        {
            ...note,
        },
        {
            where: {
                id: id,
            }
        },
    );

    console.log('update note res: ', updateNoteRes);

    return updateNoteRes;
}

module.exports = {
    getAllNotes: getAllNotes,
    createNote: createNote,
    deleteNote: deleteNote,
    getNoteById: getNoteById,
    updateNote: updateNote,
}
