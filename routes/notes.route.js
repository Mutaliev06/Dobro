const { notesController } = require("../controllers/notes.controller");
const { Router } = require("express");
const router = Router();
const authMiddleware = require('../middlewares/auth.middleware');
const express = require('express');
router.use("/Dobro", express.static(__dirname + "/image"));

router.get("/", notesController.getAllNotes);
router.get("/category/:id", authMiddleware, notesController.getCategoryNotes);
router.post('/', authMiddleware, notesController.createNote);
router.delete('/:id', authMiddleware, notesController.deleteNote);

module.exports = router;