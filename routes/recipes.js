const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const controllers = require("../controllers/recipe.controllers");
const isAuth = require("../middlewares/isAuth");
// test routing
router.get("/hellorecipes", (req, res) => {
  res.send("routing recipes OK");
});

//post recipe
//get all recipes
//get recipe by id
//delete recipe
//update recipe

//POST
//recipe posting
//PATH: http://localhost:5000/api/recipe/
//params Body
router.post("/", controllers.postRecipe);

//GET
//getting all recipes
//PATH: http://localhost:5000/api/recipe/
router.get("/", controllers.getAllRecipes);

//GET
//getting recipe by id
//PATH: http://localhost:5000/api/recipe/:id
//params id
router.get("/:id", controllers.getRecipe);

//DELETE
//deleting a recipe by id
//PATH: http://localhost:5000/api/recipe/:id
//params id
router.delete("/:id", controllers.deleteRecipe);

//PUT
//updating a recipe by id
//PATH: http://localhost:5000/api/recipe/:id
//params id body
router.put("/:id", controllers.putRecipe);

//PUT
//liking a recipe by id
//PATH: http://localhost:5000/api/recipe/like/:id
//params id body
router.put("/like/:id", isAuth, controllers.putLike);

//PUT
//unliking a recipe by id
//PATH: http://localhost:5000/api/recipe/unlike/:id
//params id body
router.put("/unlike/:id", isAuth, controllers.putUnlike);

//POST
//commenting a recipe by id
//PATH: http://localhost:5000/api/recipe/comment/:id
//params id body
router.post("/comment/:id", isAuth, controllers.postComment);
router.delete("/comment/:id/:comm_id", isAuth, controllers.deleteComment);

module.exports = router;
