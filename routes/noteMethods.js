const router = require("express").Router();
const { readFromFile, readAndAppend, writeToFile, deleteNote } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");
path = require("path");

// GET Route for retrieving all the notes
router.get("/", (req, res) => {
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

router.post("/", (req, res) => {
  // destructuring the title and text from the request body
  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: uuid(),
  };
  readAndAppend(newNote, "./db/notes.json");
  //   responds with the new note object
  return res.json(newNote);
});

router.delete("/:id", (req, res) => {
  // destructuring the id from the request parameters
  const { id } = req.params;
  // reading the notes.json file and filtering out the note with the matching id and writing the new array to the file
  //   let notes = JSON.parse(fs.readFileSync("./db/notes.json"));
  //   notes = notes.filter((note) => note.id !== id);
  //   notes = JSON.stringify(notes, null, 2);
  //   fs.writeFileSync("./db/notes.json", notes);
  //   return res.json(notes);
  deleteNote(id);
  return res.json("Note deleted successfully.");
});

module.exports = router;