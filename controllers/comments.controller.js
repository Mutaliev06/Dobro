const Comment = require("../models/Comment.model");

module.exports.commentControllers = {
  getNoteComments: async (req, res) => {
    const { id } = req.params
    try {
      const comment = await Comment.find({ note: id });
      res.json(comment);
    }
    catch (e) {
      res.json(e);
    }
  },

  createComment: async (req, res) => {
    const { text } = req.body;
    try {
      const comment = await Comment.create({
        user:req.user.id,
        text,
        note: req.params.id
      });
      res.json(comment);
    }
    catch (e) {
      res.json(e);
    }
  },

  deleteComment: async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await Comment.findById(id);
      if(comment.user.toString() === req.user.id){
        await comment.remove()
        res.json('Удалено');
      }
      return res.status(401).json('ошибка нет доступа')
    }
    catch (e) {
      res.json(e);
    }
  },
}