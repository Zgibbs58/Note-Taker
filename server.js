const express = require("express");
const path = require("path");
const fs = require("fs");
// ?? checks if the value before is null or undefined
const PORT = process.env.PORT ?? 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) => {
  return res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  return res.sendFile(path.join(__dirname, "db/notes.json"));
});

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).send("Please provide a title and text");
  } else {
    const newNote = {
      title,
      text,
      id: Math.floor(Math.random() * 1000),
    };
    let notes = JSON.parse(fs.readFileSync("./db/notes.json"));
    notes.push(newNote);
    notes = JSON.stringify(notes, null, 2);
    console.log(notes);
    fs.writeFileSync("./db/notes.json", notes);
    console.log(notes);
    return res.json(notes);
  }
});

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Application is running @ http://localhost:${PORT}`);
});
