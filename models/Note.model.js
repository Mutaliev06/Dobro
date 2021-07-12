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
      required: false
    },
    category: {
      type: String,
      required: true,
      ref: "Category",
    },
    completed: {
      type: Boolean,
      required: false,
    },
    lastImage: {
      type: String,
      required: false
    },
    lastComment: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
