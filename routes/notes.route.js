const { notesController } = require("../controllers/notes.controller");
const { Router } = require("express");
const router = Router();
const authMiddleware = require('../Middlewares/auth.middleware');

router.get("/notes", notesController.getAllNotes);
router.post('/note', authMiddleware, notesController.createNote);
router.delete('/note/:id', authMiddleware, notesController.deleteNote);

module.exports = router;