const connection = require('../connection');

class RegisterRecipeModel {
  constructor(recipe) {
    this.recipe = recipe;
  }

  async handle() {
    const db = await connection();

    const recipesCollection = await db.collection('recipes');

    const { ops } = await recipesCollection.insertOne(this.recipe);

    return { recipe: ops[0] };
  }
}

module.exports = RegisterRecipeModel;
