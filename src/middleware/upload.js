const recipeModel = require('../models/recipesModel');

const uploadMiddleware = async (req, res) => {
    const { _id } = req.params;
    const recipe = await recipeModel.getRecipeById(_id);
    console.log(recipe);
    res.status(200)
    .json({ ...recipe, image: `localhost:3000/src/uploads/${req.file.filename}`, userId: _id });
  };

  module.exports = {
    uploadMiddleware, 
}; 