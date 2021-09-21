const connection = require('../connection');

class GetAllRecipesModel {
  static async handle() {
    const db = await connection();

    const recipesCollection = await db.collection('recipes');

    const recipes = await recipesCollection.find().toArray();

    return recipes;
  }
}

module.exports = GetAllRecipesModel;
