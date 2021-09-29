const { ObjectId } = require('mongodb');
const recipesSchema = require('../Models/recipesSchema');
const { invEntries } = require('../helpers');
const recipesModel = require('../Models/recipesModel');

const validateRecipes = async (req, res, next) => {
  try {
   const { error } = recipesSchema.validate(req.body);  
    if (error) {
      return res.status(400).json(invEntries);  
    }

    next();
  } catch (e) {
    res.status(500).send('Ihhhhh deu erro');
  }
}; 

const getAllRecipes = async () => {
  const allRecipes = await recipesModel.getAllRecipes();
  return allRecipes;
};

const validateId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return false;
  }
  const getRecipesId = await recipesModel.getRecipesId(id);
  if (!getRecipesId) {
    return false;
  }
  return getRecipesId; 
};

const updatedRecipe = async (recipes, id, recipeId) => {
  const updateValidate = await recipesModel.updateRecipes(recipes, id, recipeId);
  if (!updateValidate) {
    return false;
  }
  return updateValidate;
};

module.exports = {
  validateRecipes,
  getAllRecipes,
  validateId,
  updatedRecipe,
};