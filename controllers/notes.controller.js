const Note = require("../models/Note.model");

module.exports.notesController = {
  createNote: async (req, res) => {
    const { text, category } = req.body;

    try {
      const note = await Note.create({
        user: req.user.id,
        category,
        text,
      });
      return res.json(note);
      console.log(note)
    } catch (e) {
      console.log(e.message);
      return res.status(401).json("неверный токен");
    }
  },

  deleteNote: async (req, res) => {
    const { id } = req.params;

    try {
      const note = await Note.findById(id);

      if (note.user.toString() === req.user.id) {
        await note.remove();
        res.json("Удалено");
      }
      return res.status(401).json('ошибка нет доступа')
    }
    catch (e) {
      return res.status(401).json('ошибка:' + e.toString())
    }
  },

  getAllNotes: async (req, res) => {
    const notes = await Note.find().populate("user")
    res.json(notes);
  },

  getCategoryNotes: async (req, res) => {
    const { id } = req.params
    try {
      const note = await Note.find({ category: id });
      res.json(note);
    }
    catch (e) {
      res.json(e);
    }
  }
};
