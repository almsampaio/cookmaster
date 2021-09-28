const { sign } = require('jsonwebtoken');
const userModel = require('../model/userModel');
const { SECRET, jwtConfig } = require('../util/util');

const addUser = async (name, email, password) => {
  const user = await userModel.findByEmail(email);

  if (!name || !password) return { status: 400, message: 'Invalid entries. Try again.' };
  if (user) return { status: 409, message: 'Email already registered' };

  const { password: _, ...addedUser } = await userModel.addUser(name, email, password);

  return addedUser;
};

const findAll = async () => {
  const users = await userModel.findAll();

  return users;
};

const findByEmail = async (email) => {
  const user = await userModel.findByEmail(email);
  return user;
};

const login = async (email, password) => {
  if (!email || !password) return { status: 401, message: 'All fields must be filled' };
  const user = await userModel.findByEmail(email);
  if (!user) {
    return { status: 401, message: 'Incorrect username or password' };
  }

  const token = sign({ user }, SECRET, jwtConfig);
  return { token };
};

const addRecipes = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return { status: 400, message: 'Invalid entries. Try again.' };
  }

  const addedRecipe = await userModel.addRecipe(name, ingredients, preparation, userId);

  return addedRecipe;
};

const findAllRecipes = async () => {
  const recipes = await userModel.findAllRecipes();

  return recipes;
};

const findByIdRecipes = async (id) => {
  const result = await userModel.findByIdRecipes(id);
  if (!result) {
    return { status: 404, message: 'recipe not found' };
  }

  return result;
};

const upDateRecipes = async (data, userId, id) => {
  const addedRecipe = await userModel.addRecipe(data, userId, id);

  return addedRecipe;
};

module.exports = {
  addUser,
  findAll,
  findByEmail,
  login,
  addRecipes,
  findAllRecipes,
  findByIdRecipes,
  upDateRecipes,
};