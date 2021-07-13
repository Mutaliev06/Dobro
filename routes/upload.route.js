const { Router } = require("express");
const User = require("../models/User.model");
const Note = require("../models/Note.model");

const router = Router();

const path = require("path");

router.post("/upload/:id", (req, res) => {
  const image = req.files.image;
  const fileName = `./image/${Math.random() * 10000}${path.extname(
    image.name
  )}`;

  image.mv(fileName, async (err) => {
    if (err) {
      console.log(err);
    } else {
      const user = await User.findById(req.params._id);

      user.pathToImage = fileName;
      await user.save();
      res.json("Файл загружен");
    }
  });
});

router.post("/notes/upload/:id", (req, res) => {
  const image = req.files.image;
  const fileName = `./image/${Math.random() * 10000}${path.extname(
    image.name
  )}`;
try {
  image.mv(fileName, async (err) => {
    if (err) {
      console.log(err);
    } else {
      const note = await Note.findById(req.params.id);

      note.pathToImage = fileName;
      await note.save();
      res.json("Файл загружен");
    }
  });
} catch(e) {
  console.log(e.message)
}
});

module.exports = router;
