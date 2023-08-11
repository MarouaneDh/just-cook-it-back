const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const controllers = require("../controllers/comment.controllers");

// test routing
router.get("/hellocomment", (req, res) => {
  res.send("routing comments OK");
});

//post comment
//get all comments
//get comment by id
//delete comment
//update comment

//POST
//comment posting
//PATH: http://localhost:5000/api/recipe/
//params Body
router.post("/:id", controllers.postComment);

//GET
//getting all comments
//PATH: http://localhost:5000/api/recipe/
router.get("/:id", controllers.getAllComments);

//GET
//getting comment by id
//PATH: http://localhost:5000/api/recipe/:id
//params id
router.get("/:id", controllers.getComment);

//DELETE
//deleting a comment by id
//PATH: http://localhost:5000/api/recipe/:id
//params id
router.delete("/:id", controllers.deleteComment);

//PUT
//updating a comment by id
//PATH: http://localhost:5000/api/recipe/:id
//params id body
router.put("/:id", controllers.putComment);

module.exports = router;
