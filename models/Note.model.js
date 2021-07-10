const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    pathToImage: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    comments: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Comment'
    },
    category: {
      type: String,
      required: true,
      ref: "Category"
    }
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema)

module.exports = Note;