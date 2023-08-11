const { json } = require("express");
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ingredientSchema = new schema({
  ingredient: {
    recipeId: {
      type: String,
      required: true,
    },
    ingredientName: {
      type: String,
      required: true,
    },
    ingredientValue: {
      type: Number,
      required: true,
    },
    ingredientUnity: {
      type: String,
      required: true,
    },
  },
});

module.exports = Ingredient = mongoose.model("ingredient", ingredientSchema);
