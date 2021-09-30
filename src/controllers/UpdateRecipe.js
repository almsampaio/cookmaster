const model = require('../models/Recipes');
const { OK } = require('./Status');

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;

    const newRecipe = await model.updateRecipe(id, name, ingredients, preparation);

    res.status(OK).json(newRecipe);
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = {
  updateRecipe,
};
