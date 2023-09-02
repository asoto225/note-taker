const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const PORT = 3001;

const app = express();

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get ('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
})

app.get('/api/notes', (req,res) => res.json(noteData));


app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received to add a note`);
    console.info(req.rawHeaders);
    console.info(`hello world`);
});  

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});