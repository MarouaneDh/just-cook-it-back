const { Mongoose } = require("mongoose");
const ingredient = require("../models/ingredient");
const Recipe = require("../models/Recipe");
const isAuth = require("../middlewares/isAuth");
const { Router } = require("express");

exports.postRecipe = async (req, res) => {
  try {
    // const newRecipe = new Recipe(req.body);
    recipe = new Recipe(req.body);
    if (!req.body.recipeName) {
      res.status(400).send({ message: "the recipe's name is required" });
      return;
    }
    if (!req.body.cookingTime) {
      res.status(400).send({ message: "the cooking time is required" });
      return;
    }
    if (!req.body.ingredients) {
      res.status(400).send({ message: "at least one ingredient is required" });
      return;
    }
    if (!req.body.category) {
      res.status(400).send({ message: "the category is required" });
      return;
    }
    // const response = await newRecipe.save();
    recipe.save().then(() => res.send({ message: "saved successfully" }));
    // res.send({ response: response, message: "recipe was saved" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "not able to save recipe" });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const total = await Recipe.countDocuments();
    const result = await Recipe.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.send({
      page,
      total,
      limit,
      response: result,
      message: "got recipes with success",
    });
  } catch (error) {
    res.status(400).send({ message: "can't get recipes" });
  }
};

exports.getRecipe = async (req, res) => {
  try {
    const result = await Recipe.findOne({
      _id: req.params.id,
    }).populate("ingredients");
    res.send({ response: result, message: "got recipe with success" });
  } catch (error) {
    res.status(400).send({ message: "there is no recipe with this id" });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const result = await Recipe.deleteOne({ _id: req.params.id });
    result.n
      ? res.send({ response: "recipe was deleted" })
      : res.send("there is no recipe with this id");
    res.send("deleted");
  } catch (error) {
    res.send("recipe wasn't deleted");
  }
};

exports.putRecipe = async (req, res) => {
  try {
    const result = await Recipe.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    console.log(result);
    result.nModified
      ? res.send({ message: "recipe updated successfully" })
      : res.send({ message: "the recipe has already been given this update" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "there is no recipe with this id to be updated" });
  }
};

exports.putLike = async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    );
    res.status(200).send({ response: result, message: "recipe liked" });
  } catch (error) {
    res.status(400).send({ message: "no like was given" });
    console.log(error);
  }
};

exports.putUnlike = async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      }
    );
    res.status(200).send({ response: result, message: "recipe unliked" });
  } catch (error) {
    res.status(400).send({ message: "no unlike was given" });
    console.log(error);
  }
};

exports.postComment = async (req, res) => {
  const comment = {
    text: req.body.text,
    userId: req.user._id,
    userName: req.user.firstName,
    userSurname: req.user.lastName,
  };
  console.log(comment);
  try {
    const result = await Recipe.updateOne(
      { _id: req.params.id },
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    ).populate("comments.userId", "User");
    res.status(200).send({ response: result, message: "recipe commented" });
  } catch (error) {
    console.log(error);

    res.status(400).send({ message: "no comment was given" });
  }
};
// exports.deleteRecipe = async (req, res) => {
//   try {
//     const result = await Recipe.deleteOne({ _id: req.params.id });
//     result.n
//       ? res.send({ response: "recipe was deleted" })
//       : res.send("there is no recipe with this id");
//     res.send("deleted");
//   } catch (error) {
//     res.send("recipe wasn't deleted");
//   }
// };
exports.deleteComment = async (req, res) => {
  try {
    // console.log("object");
    await Recipe.updateOne(
      { _id: req.params.id },
      { $pull: { comments: { _id: req.params.comm_id } } }
    );

    res.status(200).send({ response: "comment was deleted" });
  } catch (error) {
    console.error(error);
    res.status(400).send("comment wasn't deleted");
  }
};
