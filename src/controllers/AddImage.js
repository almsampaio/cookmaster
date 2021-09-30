const model = require('../models/Recipes');
const { OK, INTERNAL_ERROR_SERVER } = require('./Status');

const addImage = async (req, res) => {
  try {
    const { path } = req.file;
    const { id } = req.params;

    const image = `localhost:3000/${path}`;

    const newRecipes = await model.addImageInRecipe(id, image);

    res.status(OK).json(newRecipes);
  } catch (e) {
    return res.status(INTERNAL_ERROR_SERVER).json({ message: 'Erro interno', error: e });
  }
};

module.exports = {
  addImage,
};
