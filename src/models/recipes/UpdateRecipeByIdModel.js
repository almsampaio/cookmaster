const { ObjectId } = require('mongodb');
const connection = require('../connection');

class UpdateRecipeByIdModel {
  constructor(id, recipe) {
    this.id = id;
    this.recipe = recipe;
  }

  async handle() {
    const { name, ingredients, preparation } = this.recipe;

    const db = await connection();

    const recipesCollection = await db.collection('recipes');

    const recipeId = new ObjectId(this.id);

    const { value } = await recipesCollection.findOneAndUpdate(
      { _id: recipeId },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    );

    return value;
  }
}

module.exports = UpdateRecipeByIdModel;
