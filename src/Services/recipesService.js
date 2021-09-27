const recipesSchema = require('../Models/recipesSchema');
const { invEntries } = require('../helpers');

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

module.exports = {
  validateRecipes,
};