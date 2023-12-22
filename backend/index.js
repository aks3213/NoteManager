
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
app.get('/', async (req, res) => {
    const notes = await getAllNotes();
    res.send(notes);
});

// route to fetch note details by note id
app.get('/:id', async (req, res) => {
    const note = await getNoteById(req.params.id);

    res.send(note);
});

// route to update a note given id 
app.put('/:id', async (req, res) => {
    const note = await updateNote(req.params.id, req.body);

    res.send();
});

// route to delete a nore by id
app.delete('/:id', async (req, res) => {
    await deleteNote(req.params.id);

    res.send({});
});


// route to create a new note
app.post('/', async (req, res) => {
    console.log("Create a new note request: ", req.body);

    await createNote(req.body);

    res.send(req.body);
});

db.sequelize.sync().then((req) => {
    app.listen(port, () => {
        console.log('Order API is runnning at ' + port);
    })
});


