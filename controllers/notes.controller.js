const Note = require("../models/Note.model");

module.exports.notesController = {
  createNote: async (req, res) => {
    const { text, category, timeOfTheEvent, placeOfEvent, title, image } =
      req.body;
    try {
      const note = await Note.create({
        user: req.user.id,
        title,
        category,
        text,
        pathToImage: image,
        timeOfTheEvent,
        placeOfEvent,
      });
      return res.json(note);
    }
    catch (e) {
      return res.status(401).json("неверный токен: " + e.toString());
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
      return res.status(401).json("ошибка нет доступа");
    }
    catch (e) {
      return res.status(401).json("ошибка:" + e.toString());
    }
  },

  getAllNotes: async (req, res) => {
    const notes = await Note.find().populate("user");
    res.json(notes);
  },

  getCategoryNotes: async (req, res) => {
    const { id } = req.params;
    try {
      const note = await Note.find({ category: id }).populate(
        "user",
        "title, name"
      );
      res.json(note);
    }
    catch (e) {
      res.json(e);
    }
  },

  getUserNotes: async (req, res) => {
    const { id } = req.user;
    try {
      const note = await Note.find({ user: id });
      res.json(note);
    }
    catch (e) {
      res.json(e);
    }
  },

  async editNote(req, res) {
    try {
      const { id } = req.params;
      const { text, title, timeOfTheEvent, placeOfEvent  } = req.body;

      const note = await Note.findByIdAndUpdate(
        id,
        { text, title,timeOfTheEvent, placeOfEvent },
        { new: true }
      );
      res.json(note);
    }
    catch (e) {
      res.json(e.message);
    }
  },
};
