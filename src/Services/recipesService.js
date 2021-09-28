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

module.exports = {
  validateRecipes,
  getAllRecipes,
};