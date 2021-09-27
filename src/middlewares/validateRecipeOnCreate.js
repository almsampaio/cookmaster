// const { validationResult } = require('express-validator');

const validate = require('../schemas/validate');

module.exports = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  // const validation = validationResult(req);
  // if (!validation.isEmpty()) {
  //   return res.status(400).json({ message: validation.array()[0].msg });
  // }

  const validation = validate.createRecipe(name, ingredients, preparation);

  if (validation.message) {
    return res.status(400).json({ message: validation.message });
  }

  next();
};
