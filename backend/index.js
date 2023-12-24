var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

const db = require('./models');
const { getAllNotesWithCategories, getNoteWithCategoriesById, deleteNoteAndCategoryAssociateion, createNoteWithCategories, updateNoteWithCategories } = require('./repos/notesRepo');

var port = process.env.PORT || 8090;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// route for getting all available notes in the system
// list notes filtered by IsArchived when passed isArchived in query params 
app.get('/notes', async (req, res) => {
    console.log('query params: ', req.query);
    const filter = {};
    if (req.query.isArchived) {
        filter.IsArchived = req.query.isArchived
    }
    if (req.query.categories) {
        filter.Categories = req.query.categories.split(',').map(category => category.trim());
    }
    try {
        const notes = await getAllNotesWithCategories(filter, req.query.offset, req.query.limit);
        res.send(notes);
    } catch (error) {
        console.error('Error fetching all notes:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// route to fetch note details by note id
app.get('/notes/:id', async (req, res) => {
    try {
        const note = await getNoteWithCategoriesById(req.params.id);
        if (!note) {
            res.status(400).send("note note found with given id");
        }
        res.send(note);
    } catch (error) {
        console.error('Error fetching note by ID:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// route to update a note given id 
// update note title, description, etc
// archive/unarchive notes 
app.put('/notes/:id', async (req, res) => {
    try {
        const body = req.body;
        const note = {};
        let categories = [];
        if ('Title' in body) note.Title = body.Title;
        if ('Description' in body) note.Description = body.Description;
        if ('IsArchived' in body) note.IsArchived = body.IsArchived;
        if ('Categories' in body) categories = body.Categories;

        const updatedNote = await updateNoteWithCategories(req.params.id, note, categories);
        res.send(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// route to delete a note by id
app.delete('/notes/:id', async (req, res) => {
    try {
        await deleteNoteAndCategoryAssociateion(req.params.id);
        res.send({});
    } catch (error) {
        console.error('Error deleting note:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// route to create a new note
app.post('/notes', async (req, res) => {
    try {
        console.log("Create a new note request: ", req.body);
        const { Title, Description, Categories } = req.body;
        const createdNote = await createNoteWithCategories({ Title, Description, }, Categories);
        res.send(createdNote);
    } catch (error) {
        console.error('Error creating new note:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log('Order API is running at ' + port);
    });
});
