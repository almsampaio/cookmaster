const DeleteRecipeByIdModel = require('../../models/recipes/DeleteRecipeByIdModel');

class DeleteRecipeByIdService {
  constructor(id) {
    this.id = id;
  }

  async handle() {
    const deleteRecipeByIdModel = new DeleteRecipeByIdModel(this.id);

    const deletedRecipeById = await deleteRecipeByIdModel.handle();

    return deletedRecipeById;
  }
}

module.exports = DeleteRecipeByIdService;
