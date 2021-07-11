const { Router } = require("express");
const router = Router();
const { commentsControllers } = require("../controllers/comments.controller");
router.get("/note/:id/comment", commentsControllers.getCommentNote);
router.post("/note/:id/", commentsControllers.createComment);
router.delete("/comment/:id/", commentsControllers.deleteComment);

module.exports = router;
const { Router } = require("express");
const router = Router();
const { commentsControllers } = require("../controllers/comments.controller");
router.get("/note/:id/comment", commentsControllers.getCommentNote);
router.post("/note/:id/", commentsControllers.createComment);
router.delete("/comment/:id/", commentsControllers.deleteComment);

module.exports = router;