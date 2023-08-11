const { json } = require("express");
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const commentSchema = new schema({
  recipeId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  commentContent: {
    type: String,
    required: true,
  },
});

module.exports = Comment = mongoose.model("comment", commentSchema);
