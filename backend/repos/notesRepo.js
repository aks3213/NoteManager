const { Sequelize, } = require('sequelize');
const { Note } = require('../models');
const { Category } = require('../models');
const { createCategoriesIfDoNotExist } = require('./categoryRepo');

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

async function getAllNotesWithCategories(filter, offset, limit) {
    console.log('executing getAllNotesWithCategories: ', filter, offset, limit);

    const params = {
        order: [['updatedAt', 'DESC']],
        include: [
            {
                model: Category,
                as: 'Categories',
                attributes: ['Name'],
            },
        ],
    }
    if (offset) {
        params.offset = parseInt(offset);
    }
    if (limit) {
        params.limit = parseInt(limit);
    }
    if (filter.IsArchived) {
        params.where = {
            IsArchived: filter.IsArchived,
        }
    }
    if (filter.Categories) {
        params.include[0].where = {
            Name: {
                [Sequelize.Op.in]: filter.Categories,
            },
        };
    }
    console.log('params: ', JSON.stringify(params));

    const findAllRes = await Note.findAndCountAll(params);

    console.log('find all with filter res: ', findAllRes);
    return { Notes: findAllRes.rows, TotalCount: findAllRes.count };
}

async function getNoteWithCategoriesById(id) {
    console.log('executing getNoteWithCategoriesById: ', id);

    const findByPkRes = await Note.findByPk(
        id,
        {
            include: [
                {
                    model: Category,
                    as: 'Categories',
                    attributes: ['Name'],
                },
            ],
        },
    );

    console.log('find by pk res: ', findByPkRes);
    return findByPkRes;
}

async function createNoteWithCategories(note, categories) {
    console.log('executing createNoteWithCategories: ', note, categories);

    const allCategories = await createCategoriesIfDoNotExist(categories);

    const createNoteRes = await Note.create(note);

    console.log('create note res: ', JSON.stringify(createNoteRes));

    await createNoteRes.addCategories(allCategories);
    console.log('added categories to note.');

    const noteWithCategories = await getNoteWithCategoriesById(createNoteRes.dataValues.id);

    return noteWithCategories.dataValues;
}

async function updateNoteWithCategories(id, note, categories) {
    console.log('executing updateNoteWithCategories: ', id, note, categories);

    const allCategories = await createCategoriesIfDoNotExist(categories);

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

    const updatedNote = await getNoteById(id);

    await updatedNote.setCategories(allCategories);

    console.log('setting updated categories to note');

    return await getNoteWithCategoriesById(id);
}

async function deleteNoteAndCategoryAssociateion(id) {
    console.log('executing deleteNoteAndCategoryAssociateion: ', id);

    const noteToDelete = await Note.findByPk(id);

    if (!noteToDelete) {
        console.log(`Note with ID ${id} not found.`);
        return null;
    }

    await noteToDelete.setCategories([]);

    await noteToDelete.destroy();

    console.log(`Note with ID ${id} and its associations with categories deleted successfully.`);
}

module.exports = {
    getAllNotes: getAllNotes,
    createNote: createNote,
    deleteNote: deleteNote,
    getNoteById: getNoteById,
    updateNote: updateNote,
    getAllNotesWithCategories: getAllNotesWithCategories,
    updateNoteWithCategories: updateNoteWithCategories,
    getNoteWithCategoriesById: getNoteWithCategoriesById,
    createNoteWithCategories: createNoteWithCategories,
    deleteNoteAndCategoryAssociateion: deleteNoteAndCategoryAssociateion,
}
