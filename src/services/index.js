const models = require('../models');
const schema = require('./JoiSchemas');
const { newError, generateJWT } = require('../utils');

const validateUsersSchema = (userData) => {
  const { error } = schema.user.validate(userData);

  if (error) throw newError(400, 'Invalid entries. Try again.');
};

const validateUniqueEmail = async (email) => {
  const searchResult = await models.searchEmails(email);

  if (searchResult) throw newError(409, 'Email already registered');
};

const registerUser = async (userData) => {
  try {
    validateUsersSchema(userData);
    await validateUniqueEmail(userData.email);

    const userInfo = {
      ...userData,
      role: userData.role || 'user',
    };

    const createdUser = await models.create('users', userInfo);
    const { password, ...infoNoPassword } = createdUser;

    return infoNoPassword;
  } catch (e) {
    throw newError(e.status, e.message);
  }
};

const validateLoginSchema = (loginData) => {
  const { error } = schema.login.validate(loginData);

  if (error) throw newError(401, 'All fields must be filled');
};

const validateLogin = async (userData) => {
  const user = await models.searchEmails(userData.email);
  if (!user) throw newError(401, 'Incorrect username or password');

  const passMatch = String(userData.password) === String(user.password);
  if (!passMatch) throw newError(401, 'Incorrect username or password');

  const { name, password, ...tokenPayload } = user;

  return tokenPayload;
};

const logUserIn = async (loginData) => {
  try {
    validateLoginSchema(loginData);
    const loginInfo = await validateLogin(loginData);

    const token = generateJWT(loginInfo);

    return token;
  } catch (e) {
    throw newError(e.status, e.message);
  }
};

const validateRecipeSchema = (recipeData) => {
  const { error } = schema.recipe.validate(recipeData);
  console.log(error);
  if (error) throw newError(400, 'Invalid entries. Try again.');
};

const createRecipe = async (recipeData) => {
  try {
    validateRecipeSchema(recipeData);
    const recipeCreated = await models.create('recipes', recipeData);

    return recipeCreated;
  } catch (e) {
    throw newError(e.status, e.message);
  }
};

const getRecipes = async () => {
  const recipes = await models.getAll('recipes');

  return recipes;
};

const getRecipeById = async (id) => {
  try {
    const recipe = await models.getById('recipes', id);

    return recipe;
  } catch (error) {
    console.log(error);
    throw newError(404, 'recipe not found');
  }
};

const updateRecipe = async (id, updatePayload) => {
  try {
    const { name, ingredients, preparation } = updatePayload;

    validateRecipeSchema({ name, ingredients, preparation });

    await models.updateById('recipes', id, updatePayload);
    const updatedRecipe = await models.getById('recipes', id);

    return updatedRecipe;
  } catch (e) {
    throw newError(e.status, e.message);
  }
};

const updateRecipeWithImage = async (id) => {
  const recipe = await models.getById(id);

  const updatedRecipe = {
    ...recipe,
    image: `localhost:3000/src/uploads/${id}.jpeg`,
  };

  await models.updateById('recipes', id, updatedRecipe);

  return updatedRecipe;
};

module.exports = {
  registerUser,
  logUserIn,
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  updateRecipeWithImage,
};
