const { ObjectId } = require('mongodb');
const connection = require('../connection');

class InsertImageRecipeModel {
  constructor(id, path) {
    this.id = id;
    this.path = path;
  }

  async handle() {
    const db = await connection();

    const recipesCollection = await db.collection('recipes');

    const recipeId = new ObjectId(this.id);

    const { value } = await recipesCollection.findOneAndUpdate(
      { _id: recipeId },
      { $set: { image: this.path } },
      { returnOriginal: false },
    );

    return value;
  }
}

module.exports = InsertImageRecipeModel;
