const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

// function to write the new note to the notes.json file
const writeToFile = (destination, content) => {
  fs.writeFile(destination, JSON.stringify(content, null, 2), (err) => (err ? console.error(err) : console.info(`\nData written to ${destination}`)));
};

// function to read and append the new note to the notes.json file
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

const deleteNote = (id) => {
  fs.readFile("./db/notes.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const filteredNotes = parsedData.filter((note) => note.id !== id);
      writeToFile("./db/notes.json", filteredNotes);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, deleteNote };
