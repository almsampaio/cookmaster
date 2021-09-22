const recipesService = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { _id } = req.user;

  const userId = _id;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
   }

   const recipe = await recipesService.createRecipe(name, ingredients, preparation, userId);

  res.status(201).json(recipe);
};

module.exports = {
  createRecipe,
}; 
