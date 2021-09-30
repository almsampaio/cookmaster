const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const { findByEmail } = require('../models/usersModel'); 
const db = require('../models/recipesModel');

const secret = 'Nani!!!';

const createRecipesValidations = async (token, name, ingredients, preparation) => {
  try {
    const validToken = jwt.verify(token, secret);
    if (!name || !ingredients || !preparation) {
      return { err: { message: 'Invalid entries. Try again.', code: 'BAD_REQUEST' } };
    }
    const { _id: userId } = await findByEmail(validToken.payload.userEmail);
    return userId;
  } catch (_err0r) {
    return { err: { message: 'jwt malformed', code: 'UNAUTHORIZED' } };
  }  
};

const createRecipes = async (body, authorization) => {
  const token = authorization;
  const { name, ingredients, preparation } = body;

  const isValid = await createRecipesValidations(token, name, ingredients, preparation);
  if (isValid.err) return isValid; 
  const userId = isValid;
  const newRecipe = await db.createRecipes(name, ingredients, preparation, userId);
  return newRecipe;
};

const getRecipes = async () => {
  const recipes = await db.getRecipes();

  return recipes;
};

const getRecipeByID = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { err: { message: 'recipe not found', code: 'NOT_FOUND' } };
  }
  const recipeByID = await db.getRecipeByID(id);
  if (!recipeByID) {
    return { err: { message: 'recipe not found', code: 'NOT_FOUND' } };
  }
  return recipeByID;
};

const isValidUser = async (userEmail, recipeID) => {
  const { _id: userID, role } = await findByEmail(userEmail);
  const { userId: recipeUserID } = await getRecipeByID(recipeID);
  if (String(userID) === String(recipeUserID) || role === 'admin') return true;
  return { err: { message: 'missing auth token', code: 'UNAUTHORIZED' } };
};

const updateRecipesValidations = async (token, body, recipeID) => {
  const { name, ingredients, preparation } = body;

  try {
    const validToken = jwt.verify(token, secret);
    if (!name || !ingredients || !preparation) {
      return { err: { message: 'Invalid entries. Try again.', code: 'BAD_REQUEST' } };
    }
    const userValid = await isValidUser(validToken.payload.userEmail, recipeID);
    return userValid;
  } catch (_err0r) {
    return { err: { message: 'jwt malformed', code: 'UNAUTHORIZED' } };
  }  
};

const updateRecipeByID = async (body, authorization, id) => {
  const token = authorization;
  const recipeID = id;
  if (!token) return { err: { message: 'missing auth token', code: 'UNAUTHORIZED' } };
  const isValid = await updateRecipesValidations(token, body, recipeID);
  if (isValid.err) return isValid; 
  const updatedRecipe = await db
    .updateRecipeByID(body.name, body.ingredients, body.preparation, recipeID);
  return updatedRecipe;
};

const deleteRecipesValidations = async (token, recipeID) => {
  try {
    const validToken = jwt.verify(token, secret);
    const userValid = await isValidUser(validToken.payload.userEmail, recipeID);
    return userValid;
  } catch (_err0r) {
    return { err: { message: 'jwt malformed', code: 'UNAUTHORIZED' } };
  }  
};

const deleteRecipeByID = async (authorization, id) => {
  const token = authorization;
  const recipeID = id;
  if (!token) return { err: { message: 'missing auth token', code: 'UNAUTHORIZED' } };
  const isValid = await deleteRecipesValidations(token, recipeID);
  if (isValid.err) return isValid; 
  const deletedUser = await db
    .deleteRecipeByID(recipeID);
  return deletedUser;
  };

module.exports = {
  createRecipes,
  getRecipes,
  getRecipeByID,
  updateRecipeByID,
  deleteRecipeByID,
};
