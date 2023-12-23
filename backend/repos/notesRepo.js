const { Note } = require('../models');

async function getAllNotes(filter, offset, limit) {
    console.log('executing getAllNotes with possible filter: ', filter);

    const params = {
        where: filter,
        order: [['updatedAt', 'DESC']],
    }
    if (offset) {
        params.offset = parseInt(offset);
    }
    if (limit) {
        params.limit = parseInt(limit);
    }
    console.log('params: ', params);

    const findAllRes = await Note.findAndCountAll(params);

    console.log('find all with filter res: ', findAllRes);
    return { Notes: findAllRes.rows, TotalCount: findAllRes.count };
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

    return await getNoteById(id);
}

module.exports = {
    getAllNotes: getAllNotes,
    createNote: createNote,
    deleteNote: deleteNote,
    getNoteById: getNoteById,
    updateNote: updateNote,
}
