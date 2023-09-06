const express = require('express');
const { writeFile } = require('fs/promises')
const path = require('path');
const noteData = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
const PORT = 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get ('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req,res) => {
    res.json(noteData);
});


app.post('/api/notes', (req, res) => {
    const newPost = req.body
    newPost.id = uuidv4()
    noteData.push(newPost)
    writeFile('db/db.json', JSON.stringify(noteData))
    res.json(noteData)
});  

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});