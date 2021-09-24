const jwt = require('jsonwebtoken');
const ModelUsers = require('../model/users');

const re = /\S+@\S+\.\S+/;
const validetionId = /[0-9a-z]{24}/;
const secret = 'Cookmaster';

const util = (status, message) => ({ status, message });

const validateUser = (name, password, email) => {
  if (!name) return null;

  if (!email || !re.test(email)) return null;

  if (!password) return null;

  return true;
};

const validateEmailAndPassword = (email, password) => {
  if (!email) return null;

  if (!password) return null;

  return true;
};

const validateRecipe = ({ name, preparation, ingredients }) => {
  if (!name) return null;

  if (!preparation) return null;

  if (!ingredients) return null;

  return true;
};

const addUser = async (name, password, email) => {
  const role = 'user';
  const findEmail = await ModelUsers.findEmail(email);
  const validations = validateUser(name, password, email);

  if (findEmail) throw util(409, 'Email already registered');

  if (validations === null) throw util(400, 'Invalid entries. Try again.');

  const insert = await ModelUsers.addUser(name, password, email, role);

  return insert;
};

const findUser = async (email, password) => {
  const user = await ModelUsers.findUser(email, password);

  const validations = validateEmailAndPassword(email, password);

  if (!validations) throw util(401, 'All fields must be filled');

  if (!user) throw util(401, 'Incorrect username or password');

  const payload = user;

  const token = jwt.sign(payload, secret);

  return token;
};

const addRecipes = async (recipe, token) => {
  const recipeValidate = validateRecipe(recipe);

  if (!recipeValidate) throw util(400, 'Invalid entries. Try again.');

  if (!token) throw util(401, 'jwt malformed');

  let id;
  try {
    const { _id } = jwt.verify(token, secret);
    id = _id;
  } catch (_err) {
    throw util(401, 'jwt malformed');
  }

  const newRecipe = await ModelUsers.addRecipes({ userId: id, ...recipe });

  return newRecipe;
};

const getRecipes = async () => {
  const recipes = await ModelUsers.getRecipes();

  return recipes;
};

const getRecipe = async (id) => {
  if (!validetionId.test(id)) throw util(404, 'recipe not found');

  const recipe = await ModelUsers.getRecipe(id);

  if (!recipe) throw util(404, 'recipe not found');

  return recipe;
};

const updateRecipe = async (idRecipe, token, newRecipe) => {
  if (!token) throw util(401, 'missing auth token');

  try {
    jwt.verify(token, secret);
  } catch (_err) {
    throw util(401, 'jwt malformed');
  }

  await ModelUsers.updateRecipe(idRecipe, newRecipe);

  const recepe = await ModelUsers.getRecipe(idRecipe);

  return recepe;
};

const deleteRecipe = async (idRecipe, token) => {
  if (!token) throw util(401, 'missing auth token');

  try {
    jwt.verify(token, secret);
  } catch (_err) {
    throw util(401, 'missing auth token');
  }

  await ModelUsers.deleteRecipe(idRecipe);
};

module.exports = {
  addUser,
  findUser,
  addRecipes,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
