const { Router } = require("express");
const router = Router();
const { commentControllers } = require("../controllers/comments.controller");
const authMiddleware = require('../Middlewares/auth.middleware');

router.get("/note/:id/comment", commentControllers.getNoteComments);
router.post("/note/:id/", authMiddleware, commentControllers.createComment);
router.delete("/comment/:id/", authMiddleware, commentControllers.deleteComment);

module.exports = router;