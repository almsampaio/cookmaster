const recipesServices = require('../Services/recipesServices');

const INTERNAL_SERVER_ERROR = 500;

const addRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { code, message, recipe } = await recipesServices.addRecipes(
      name, ingredients, preparation, req.user,
    );

    return res.status(code).json({ message, ...recipe });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json(
      { message: 'Erro interno', error: err },
    );
  }
};

module.exports = {
  addRecipes,
};