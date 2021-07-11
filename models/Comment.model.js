const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    note: {
      type: Schema.Types.ObjectId,
      ref: "Note",
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
