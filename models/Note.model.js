const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    pathToImage: {
      type: String,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    volunteers: mongoose.Schema({
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
      },
    }),
    category: {
      type: String,
      required: true,
      ref: "Category",
    },
    completed: {
      type: Boolean,
    },
    lastComment: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    timeOfTheEvent: {
      type: String,
      required: true
    },
    placeOfEvent: {
      type: String,
    }
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
