const express = require("express");
const app = express();

const path = require("path");
const notes = require(path.resolve("src/data/notes-data"));

app.use(express.json());



function noteValidation(req, res, next) { //middleware
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote) {
    return next()
  }
  next({
    status: 404,
    message: `Note id not found: ${req.params.noteId}`
  })
}

app.get("/notes/:noteId", 
noteValidation,
(req, res) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  // if (foundNote) {
    res.status(200).json({ data: foundNote });
  // } else {
  //   return next(`Note id not found: ${req.params.noteId}`);
  // }
});

/*
// moved this to pastes.controller.js
app.get("/notes", (req, res) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
  res.json({ data: notes });
});
*/
function bodyTextValidation(req, res, next) { //middleware
  const { data: { text } = {} } = req.body;
  if (text) {
    next()
  }
  next({
    status: 400, 
    message: "A 'text' property is needed."
  })
}

let lastNoteId = notes.reduce((maxId, note) => Math.max(maxId, note.id), 0);

app.post("/notes", 
bodyTextValidation,
(req, res) => {
  const { data: { text } = {} } = req.body;
  // if (text) {
    const newNote = {
      id: ++lastNoteId, // Increment last id then assign as the current ID
      text,
    };
    notes.push(newNote);
    res.status(201).json({ data: newNote });
  // } else {
  //   res.sendStatus(400);
  // }
});

// Not found handler
app.use((req, res, next) => {
  next({
    status: 404,
    message:`Not found: ${req.originalUrl}`});
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const {status = 500, message = "Something went wrong"} = error
  res.status(status).send({error: message});
});

module.exports = app;
