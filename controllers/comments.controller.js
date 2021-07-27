const Comment = require("../models/Comment.model");
const jwt = require('jsonwebtoken');

module.exports.commentControllers = {
  getNoteComments: async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await Comment.find({ note: id }).populate('user');
      res.json(comment);
    } catch (e) {
      res.json(e);
    }
  },

  createComment: async (req, res) => {
    const { text } = req.body;

    const { authorization } = req.headers;
    const [type, token] = authorization.split(' ');

    try {
      const user = await jwt.verify(token, process.env.SECRET_JWT_KEY)
      const comment = await (await Comment.create({
        user: user.id,
        text,
        note: req.params.id,
      })).populate('user');
      res.json(comment)
    }
    catch (e) {
      const comment = await Comment.create({
        text,
        note: req.params.id,
      });
      res.json(comment)
    }
  },

  deleteComment: async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await Comment.findById(id);
      if (comment.user.toString() === req.user.id) {
        await comment.remove();
        res.json("Удалено");
      }
      return res.status(401).json("ошибка нет доступа");
    } catch (e) {
      res.json(e);
    }
  },
};
