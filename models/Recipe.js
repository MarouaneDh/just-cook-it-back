const { json } = require("express");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const schema = mongoose.Schema;

const recipeSchema = new schema({
  recipeName: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  timeUnit: {
    type: String,
    required: true,
  },
  steps: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      ingredientName: {
        type: String,
      },
      ingredientValue: {
        type: Number,
      },
      ingredientUnity: {
        type: String,
      },
    },
  ],
  likes: [{ type: ObjectId, ref: "User" }],
  comments: [
    {
      text: String,
      userId: { type: Object, ref: "User" },
      userName: { type: Object, ref: "User" },
      userSurname: { type: Object, ref: "User" },
    },
  ],
});

module.exports = Recipe = mongoose.model("recipe", recipeSchema);
