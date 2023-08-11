exports.postIngredients = async (req, res) => {
  try {
    const newIngredients = new Ingredients(req.body);
    const response = await newIngredients.save();
    res.send({ response: response, message: "Ingredients was saved" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "not able to save Ingredients" });
  }
};

exports.getAllIngredients = async (req, res) => {
  try {
    const result = await Ingredients.find();
    res.send({ response: result, message: "got Ingredientss with success" });
  } catch (error) {
    res.status(400).send({ message: "can't get Ingredientss" });
  }
};

exports.getIngredients = async (req, res) => {
  try {
    const result = await Ingredients.findOne({ _id: req.params.id });
    res.send({ response: result, message: "got Ingredients with success" });
  } catch (error) {
    res.status(400).send({ message: "there is no Ingredients with this id" });
  }
};

exports.deleteIngredients = async (req, res) => {
  try {
    const result = await Ingredients.deleteOne({ _id: req.params.id });
    result.n
      ? res.send({ response: "Ingredients was deleted" })
      : res.send("there is no Ingredients with this id");
    res.send("deleted");
  } catch (error) {
    res.send("Ingredients wasn't deleted");
  }
};

exports.putIngredients = async (req, res) => {
  try {
    const result = await Ingredients.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    console.log(result);
    result.nModified
      ? res.send({ message: "Ingredients updated successfully" })
      : res.send({
          message: "the Ingredients has already been given this update",
        });
  } catch (error) {
    res
      .status(400)
      .send({ message: "there is no Ingredients with this id to be updated" });
  }
};
