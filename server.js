const express = require("express");
const path = require("path");
const fs = require("fs");
// ?? checks if the value before is null or undefined
const routes = require("./routes");
const uuid = require("./helpers/uuid");
const { readAndAppend, writeToFile, deleteNote } = require("./helpers/fsUtils");
const PORT = process.env.PORT ?? 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data to access req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(routes);

// app.get("/notes", (req, res) => {
//   return res.sendFile(path.join(__dirname, "public/notes.html"));
// });

// app.get("/api/notes", (req, res) => {
//   return res.sendFile(path.join(__dirname, "db/notes.json"));
// });

// app.post("/api/notes", (req, res) => {
//   // destructuring the title and text from the request body
//   const { title, text } = req.body;
//   const newNote = {
//     title,
//     text,
//     id: uuid(),
//   };
//   // reading the notes.json file and adding the new note to the array
//   // let notes = JSON.parse(fs.readFileSync("./db/notes.json"));
//   // notes.push(newNote);
//   // notes = JSON.stringify(notes, null, 2);
//   // fs.writeFileSync("./db/notes.json", notes);
//   readAndAppend(newNote, "./db/notes.json");
//   return res.json(newNote);
// });

// app.delete("/api/notes/:id", (req, res) => {
//   // destructuring the id from the request parameters
//   const { id } = req.params;
//   // reading the notes.json file and filtering out the note with the matching id and writing the new array to the file
//   let notes = JSON.parse(fs.readFileSync("./db/notes.json"));
//   notes = notes.filter((note) => note.id !== id);
//   notes = JSON.stringify(notes, null, 2);
//   fs.writeFileSync("./db/notes.json", notes);
//   return res.json(notes);
//   // deleteNote(id);
//   // return res.json("Note deleted successfully.");
// });

// app.get("*", (req, res) => {
//   return res.sendFile(path.join(__dirname, "public/index.html"));
// });

app.listen(PORT, () => {
  console.log(`Application is running @ http://localhost:${PORT}`);
});
