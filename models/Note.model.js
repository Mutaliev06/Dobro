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
    volunteers: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true
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
    lastImage: {
      type: String,
      required: true
    },
    lastComment: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
