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
  deleteNote(id);
  //  always have to have a response to update page data
  return res.json("Note deleted successfully.");
});

module.exports = router;
