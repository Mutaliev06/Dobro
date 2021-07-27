const { notesController } = require("../controllers/notes.controller");
const { Router } = require("express");
const router = Router();
const authMiddleware = require('../middlewares/auth.middleware');


router.get("/", notesController.getAllNotes);
router.get("/category/:id", notesController.getCategoryNotes);
router.get("/admin/", authMiddleware, notesController.getUserNotes);
router.post('/', authMiddleware, notesController.createNote);
router.post('/:id', authMiddleware, notesController.createLastComment);
router.patch('/:id', authMiddleware, notesController.editNote);
router.delete('/:id', authMiddleware, notesController.deleteNote);

module.exports = router;