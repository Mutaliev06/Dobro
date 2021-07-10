const Comment = require("../models/Comment.model");
const jwt = require('jsonwebtoken')


module.exports.commentControllers = {
  getCommentNote: async (req, res) => {
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
    const { authorization } = req.headers;
    const [type, token] = authorization.split(' ');

    if (type !== "bearer") {
      return res.status(400).json('неверный тип токена')
    }
    try {

      const payload = await jwt.verify(token, process.env.SECRET_KEY)

      const comment = await Comment.create({
        user: payload.id,
        text,
      });
      res.json(comment);
    }
    catch (e) {
      res.json(e);
    }
  },
  deleteComment: async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;
    const [type, token] = authorization.split(' ');
    if (!authorization) {
      //
    }
    if (type !== "Bearer") {
      return res.status(400).json('неверный тип токена')
    }
    try {

      const payload = await jwt.verify(token, process.env.SECRET_KEY)

      const comment = await Comment.findById(id);
      if(comment.user.toString() === payload.id){
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
//   patchReport: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { text,  } = req.body;
//       const patchReport = await Comment.findByIdAndUpdate(id, {
//         report,
//         status,
//       }, { new: true });
//       console.log(patchReport)
//       res.json(patchReport);
//     } catch (e) {
//       res.json(e);
//     }
//   },
// };