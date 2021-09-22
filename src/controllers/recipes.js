const recipeService = require('../services/recipes');

// const checkRecipe = (name, ingredients, preparation) => {
//   const check = checkRecipeType(name, ingredients, preparation);
//   if (check) return check;
//   if (!name) return { message: INVALID, error: 400 };
//   if (!ingredients) return { message: INVALID, error: 400 };
//   if (!preparation) return { message: INVALID, error: 400 };
//   return false;
// };

const addRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.token;
  const authorId = _id;
  const newRecipe = { name, ingredients, preparation, authorId };
  
  const newRecipeAdded = await recipeService.addRecipe(newRecipe);

  if (!newRecipeAdded.error) return res.status(201).json({ recipe: newRecipeAdded });
  return res.status(newRecipeAdded.error).json(newRecipeAdded);
};

module.exports = {
  addRecipe,
};