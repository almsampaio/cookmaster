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

module.exports = {
  createRecipes,
  getRecipes,
  getRecipeByID,
};
