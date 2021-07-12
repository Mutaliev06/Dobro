const { Router } = require("express");
const router = Router();
const { commentControllers } = require("../controllers/comments.controller");
const authMiddleware = require('../middlewares/auth.middleware');

router.get("/note/:id", commentControllers.getNoteComments);
router.post("/note/:id", authMiddleware, commentControllers.createComment);
router.delete("/:id", authMiddleware, commentControllers.deleteComment);

module.exports = router;