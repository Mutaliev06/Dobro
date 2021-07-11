const { notesController } = require("../controllers/notes.controller");
const { Router } = require("express");
const router = Router();

router.get("/notes", notesController.getAllNotes);
router.post('/notes', notesController.createNote);
router.delete('/note/:id', notesController.deleteNote);

module.exports = router;