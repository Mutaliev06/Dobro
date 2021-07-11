const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    pathToImage: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    comments: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comment",
      required: false
    },
    category: {
      type: String,
      required: false,
      ref: "Category",
    },
    completed: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
