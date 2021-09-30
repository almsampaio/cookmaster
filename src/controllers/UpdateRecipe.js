const model = require('../models/Recipes');
const { OK, INTERNAL_ERROR_SERVER } = require('./Status');

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;

    const newRecipe = await model.updateRecipe(id, name, ingredients, preparation);

    res.status(OK).json(newRecipe);
  } catch (e) {
    return res.status(INTERNAL_ERROR_SERVER).json({ message: 'Erro interno', error: e });
  }
};

module.exports = {
  updateRecipe,
};
