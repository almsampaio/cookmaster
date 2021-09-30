const model = require('../models/Recipes');
const { OK } = require('./Status');

const addImage = async (req, res) => {
  try {
    const { path } = req.file;
    const { id } = req.params;

    const image = `localhost:3000/${path}`;

    const newRecipes = await model.addImageInRecipe(id, image);

    res.status(OK).json(newRecipes);
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = {
  addImage,
};
