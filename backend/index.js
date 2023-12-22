var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

const db = require('./models');
const { getAllNotes, getNoteById, deleteNote, createNote, updateNote } = require('./repos/notesRepo');

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
    try {
        const notes = await getAllNotes(filter, req.query.offset, req.query.limit);
        res.send(notes);
    } catch (error) {
        console.error('Error fetching all notes:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// route to fetch note details by note id
app.get('/notes/:id', async (req, res) => {
    try {
        const note = await getNoteById(req.params.id);
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
        await updateNote(req.params.id, req.body);
        res.send();
    } catch (error) {
        console.error('Error updating note:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// route to delete a note by id
app.delete('/notes/:id', async (req, res) => {
    try {
        await deleteNote(req.params.id);
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
        const createdNote = await createNote(req.body);
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
