const express = require("express");
const router = express.Router();
const Ingredients = require("../models/ingredients");
const controllers = require("../controllers/ingredients.controllers");

// test routing
router.get("/helloingredients", (req, res) => {
  res.send("routing ingredients OK");
});

//post ingredient
//get all ingredients
//get ingredients by id
//delete ingredient
//update ingredient

//POST
//ingredient posting
//PATH: http://localhost:5000/api/ingredients/
//params Body
router.post("/", controllers.postIngredients);

//GET
//getting all ingredients
//PATH: http://localhost:5000/api/ingredients/
router.get("/:id", controllers.getAllIngredients);

//GET
//getting ingredient by id
//PATH: http://localhost:5000/api/ingredients/:id
//params id
router.get("/:id", controllers.getIngredients);

//DELETE
//deleting an ingredient by id
//PATH: http://localhost:5000/api/ingredients/:id
//params id
router.delete("/:id", controllers.deleteIngredients);

//PUT
//updating an ingredient by id
//PATH: http://localhost:5000/api/ingredients/:id
//params id body
router.put("/:id", controllers.putIngredients);

module.exports = router;
