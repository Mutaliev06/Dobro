const { Router } = require("express");
const path = require("path");
const User = require("../models/User.model");
const Note = require("../models/Note.model");

const router = Router();

router.post("/upload/avatar/:id", (req, res) => {
  const img = req.files.image;
  const fileName = `./image/${Math.random() * 10000}${path.extname(img.name)}`;


  img.mv(fileName, async (err) => {
    if (err) {
    } else {
      const user = await User.findById(req.params.id);

      user.pathToImage = fileName;
      await user.save();
      res.json("Файл загружен");
    }
  });
});

router.post("/upload/notes/:id", (req, res) => {
  const img = req.files.image;
  const fileName = `./image/${Math.random() * 10000}${path.extname(img.name)}`;

  try {
    img.mv(fileName, async (err) => {
      if (err) {
        console.log(err);
      } else {
        const note = await Note.findById(req.params.id);

        note.pathToImage = fileName;
        await note.save();
        console.log(note);
        res.json("Файл загружен");
      }
    });
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
