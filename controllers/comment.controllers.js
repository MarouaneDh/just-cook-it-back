exports.postComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    if (!req.body.recipeId) {
      res.status(400).send({ message: "the recipe id is required" });
      return;
    }
    if (!req.body.userId) {
      res.status(400).send({ message: "the user id is required" });
      return;
    }
    if (!req.body.commentContent) {
      res.status(400).send({ message: "a comment content is required" });
      return;
    }
    const response = await newComment.save();
    res.send({ response: response, message: "comment was saved" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "not able to save comment" });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const result = await Comment.find();
    res.send({ response: result, message: "got Comments with success" });
  } catch (error) {
    res.status(400).send({ message: "can't get comments" });
  }
};

exports.getComment = async (req, res) => {
  try {
    const result = await Comment.findOne({ _id: req.params.id });
    res.send({ response: result, message: "got comment with success" });
  } catch (error) {
    res.status(400).send({ message: "there is no comment with this id" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const result = await Comment.deleteOne({ _id: req.params.id });
    result.n
      ? res.send({ response: "comment was deleted" })
      : res.send("there is no comment with this id");
    res.send("deleted");
  } catch (error) {
    res.send("comment wasn't deleted");
  }
};

exports.putComment = async (req, res) => {
  try {
    const result = await Comment.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    console.log(result);
    result.nModified
      ? res.send({ message: "Comment updated successfully" })
      : res.send({ message: "the Comment has already been given this update" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "there is no Comment with this id to be updated" });
  }
};
