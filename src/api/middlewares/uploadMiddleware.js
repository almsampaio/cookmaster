const recipeModel = require('../models/recipesModel');

const uploadMiddleware = async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeModel.getById(id);
    console.log(recipe);
    res.status(200)
    .json({ ...recipe, image: `localhost:3000/src/uploads/${req.file.filename}`, userId: id });
  };

  module.exports = {
    uploadMiddleware,
  
}; 