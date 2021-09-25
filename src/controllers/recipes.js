const { createRecipe } = require('../services/recipesService');

const createRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    const result = await createRecipe(name, ingredients, preparation, token);

    return res.status(result.status).json({ recipe: result.message });
  } catch (e) { // apartir de agora começarei a usar o Throw new Error, Obrigado Caputo
    return res.status(e.status).json({ message: e.message });
  }
};

module.exports = {
  createRecipes,
};
