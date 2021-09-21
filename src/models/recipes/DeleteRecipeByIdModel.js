const { ObjectId } = require('mongodb');
const connection = require('../connection');

class DeleteRecipeByIdModel {
  constructor(id) {
    this.id = id;
  }

  async handle() {
    const db = await connection();

    const recipesCollection = await db.collection('recipes');

    const recipeId = new ObjectId(this.id);

    const { value } = await recipesCollection.findOneAndDelete({
      _id: recipeId,
    });

    return value;
  }
}

module.exports = DeleteRecipeByIdModel;
