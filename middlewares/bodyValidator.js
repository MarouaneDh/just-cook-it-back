const { body, validationResult } = require("express-validator");

const registerRules = () => [
  body("firstName", "First name is required").notEmpty(),
  body("lastName", "Last name is required").notEmpty(),
  body("email", "email is invalid").isEmail(),
  body("password", "password must contain at least 8 characters").isLength({
    min: 8,
    max: 20,
  }),
  body("userName", "user name is required").notEmpty(),
  body("age", "age is required").notEmpty(),
  body("birthday", "birthday is required").notEmpty(),
  body("country", "country is required").notEmpty(),
  body("state", "state is required").notEmpty(),
  body("street", "street is required").notEmpty(),
  body("zipCode", "zipCode is required").notEmpty(),
  body("gender", "gender is required").notEmpty(),
  body("city", "city is required").notEmpty(),
];

const loginRules = () => [
  body("email", "invalid email").isEmail(),
  body(
    "password",
    "password must contain between 8 and 20 characters"
  ).isLength({
    min: 8,
    max: 20,
  }),
];

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array().map((el) => ({
        msg: el.msg,
      })),
    });
  }
  next();
};

module.exports = {
  validator,
  loginRules,
  registerRules,
};
