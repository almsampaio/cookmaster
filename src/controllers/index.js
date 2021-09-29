const services = require('../services');

const registerUser = async (req, res, _next) => {
  const { name, email, password, role } = req.body;
  const createdUser = await services.registerUser({ name, email, password, role });

  return res.status(201).json({ user: createdUser });
};

const logUserIn = async (req, res, _next) => {
  const { email, password } = req.body;
  const token = await services.logUserIn({ email, password });

  return res.status(200).json({ token });
};

const createRecipe = async (req, res, _next) => {
  const { userId } = req.authInfo;
  const { name, preparation, ingredients } = req.body;
  const recipeData = { name, ingredients, preparation, userId };
  const recipe = await services.createRecipe(recipeData);

  return res.status(201).json({ recipe });
};

module.exports = {
  registerUser,
  logUserIn,
  createRecipe,
};
