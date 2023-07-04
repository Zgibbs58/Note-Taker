const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./noteMethods");

router.use("/api/notes", apiRoutes);

router.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/notes", (req, res) => {
  return res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// router.get("*", (req, res) => {
//   return res.sendFile(path.join(__dirname, "../public/index.html"));
// });

module.exports = router;
