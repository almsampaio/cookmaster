const recipesModel = require('../Models/recipesModel');
const { HTTP_CREATED_STATUS } = require('../helpers');

const createdRecipes = async (req, res) => {
 try {
  const { name, ingredients, preparation } = req.body;
  const createRecipe = await recipesModel.createRecipes({ name, ingredients, preparation });
  console.log(createRecipe);
 return res.status(HTTP_CREATED_STATUS).json({ recipe: { ...createRecipe } });
} catch (e) {
  console.log(e);
}
};

module.exports = {
  createdRecipes,
};
