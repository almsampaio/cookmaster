const InsertImageRecipeService = require('../../services/recipes/InsertImageRecipeService');

const BASE_URL = 'localhost:3000';

class InsertImageRecipeController {
  static async handle(req, res) {
    const { filename } = req.file;

    const { id } = req.params;

    const path = `${BASE_URL}/src/uploads/${filename}`;

    const insertImageRecipeService = new InsertImageRecipeService(id, path);

    const updatedImage = await insertImageRecipeService.handle();

    res.status(200).json(updatedImage);
  }
}

module.exports = InsertImageRecipeController;
