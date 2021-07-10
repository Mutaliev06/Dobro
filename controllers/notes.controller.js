const Note = require('../models/Note.model');
const jwt = require('jsonwebtoken');

module.exports.notesController = {
  createNote: async (req, res) => {
    const { text } = req.body
    const { authorization } = req.headers;

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      return res.status(400).json('неверный тип токена')
    }

    try {
      const payload = await jwt.verify(token, process.env.SECRET_JWT_KEY)

      const note = await Note.create({
        user: payload.id,
        text
      })
      return res.json(note)
    }
    catch (e) {
      return res.status(401).json('неверный токен')
    }
  },

  deleteNote: async (req, res) => {
    const { id } = req.params
    const { authorization } = req.headers

    if (!authorization) {

    }

    const [type, token] = authorization.split(" ")

    if (type !== "Bearer") {
      return res.status(400).json('неверный тип токена')
    }

    try {
      const payload = await jwt.verify(token, process.env.SECRET_JWT_KEY)

      const Note = await Note.findById(id)

      if (Note.user === payload.id) {
        await Note.remove();

        return res.json("Удалено")
      }

      return res.status(401).json("ошибка. нет доступа")
    }
    catch (e) {
      return res.status(401).json('неверный токен')
    }
  },

  getAllNotes: async (req, res) => {
    const notes = await Note.find()
    res.json(notes);
  }
}