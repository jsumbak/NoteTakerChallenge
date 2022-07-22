const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const fs = require('fs');
// variable for deleting notes 
const { v4: uuidv4 } = require('uuid')

// const apiRoutes = require('./routes/router');
const notes = require('./db/db.json');
// const { Console } = require('console');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use('/api', routes);


app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json',function (error, data){
        var notes = JSON.parse(data)
        res.json(notes)
    })
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/api/notes', (req, res) => {
    fs.readFile('/db/db.json' , function (error, data) {
        console.log(error)
    var notes = JSON.parse(data)
    var newnote = req.body
    newnote.id = uuidv4()
    console.log(newnote)
    notes.push(newnote)
    fs.writeFile('./db/db.json',JSON.stringify(notes),function (error, data) {
        res.json(newnote)
    })    
    })
})

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('.db/db.json', function (error, data) {
        console.log(error)
    var notes = JSON.parse(data)
    var updatednotes = notes.filter(function (note) {
        return note.id !== req.params.id
    })
    fs.writeFile('./db/db.json',JSON.stringify(updatednotes),function (error, data) {
        res.json(updatednotes)
    }) 
})   
});

app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
);