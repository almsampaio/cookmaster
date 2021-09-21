const { ObjectId } = require('mongodb');
const connection = require('../connection');

class GetRecipeByIdModel {
  constructor(id) {
    this.id = id;
  }

  async handle() {
    const db = await connection();

    const recipesCollection = await db.collection('recipes');

    const recipe = await recipesCollection.findOne(new ObjectId(this.id));

    if (!recipe) return null;

    return recipe;
  }
}

module.exports = GetRecipeByIdModel;
