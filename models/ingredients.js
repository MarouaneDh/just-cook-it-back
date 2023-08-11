const { json } = require("express");
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ingredientsSchema = new schema({
  ingredient: { type: String },
});

module.exports = Ingredients = mongoose.model("ingredients", ingredientsSchema);
