const DeleteRecipeByIdService = require('../../services/recipes/DeleteRecipeByIdService');

class DeleteRecipeByIdController {
  static async handle(req, res) {
    const { id } = req.params;

    const deleteRecipeByIdService = new DeleteRecipeByIdService(id);

    await deleteRecipeByIdService.handle();

    res.status(204).json();
  }
}

module.exports = DeleteRecipeByIdController;
