const { Router } = require("express");
const router = Router();
const { commentControllers } = require("../controllers/comments.controller");
const authMiddleware = require('../Middlewares/auth.middleware');

router.get("/note/:id/comment", commentControllers.getNoteComments);
router.post("/note/:id/", authMiddleware, commentControllers.createComment);
router.delete("/comment/:id/", authMiddleware, commentControllers.deleteComment);

module.exports = router;
const { Router } = require("express");
const router = Router();
const { commentsControllers } = require("../controllers/comments.controller");
router.get("/note/:id/comment", commentsControllers.getCommentNote);
router.post("/note/:id/", commentsControllers.createComment);
router.delete("/comment/:id/", commentsControllers.deleteComment);

module.exports = router;