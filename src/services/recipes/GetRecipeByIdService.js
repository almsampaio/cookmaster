const { ObjectId } = require('mongodb');
const GetRecipeByIdModel = require('../../models/recipes/GetRecipeByIdModel');

class GetRecipeByIdService {
  constructor(id) {
    this.id = id;
  }

  async handle() {
    const err = {
      code: 404,
      message: 'recipe not found',
      isError: true,
    };

    if (!ObjectId.isValid(this.id)) return err;

    const getRecipeByIdModel = new GetRecipeByIdModel(this.id);

    const recipe = await getRecipeByIdModel.handle();

    if (!recipe) {
      return err;
    }

    return recipe;
  }
}

module.exports = GetRecipeByIdService;
