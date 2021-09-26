const recipesService = require('../services/recipesService');

const createRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    const result = await recipesService.createRecipe(name, ingredients, preparation, token);

    return res.status(result.status).json({ recipe: result.message });
  } catch (e) { // apartir de agora começarei a usar o Throw new Error, Obrigado Caputo
    return res.status(e.status).json({ message: e.message });
  }
};

const getRecipes = async (_req, res) => {
  try {
    const response = await recipesService.getRecipes();
    console.log(response);
    return res.status(response.status).json(response.response);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

module.exports = {
  createRecipes,
  getRecipes,
};
