const mongoConnection = require('./connection');

module.exports = {
  async create(name, ingredients, preparation, user) {
    const db = await mongoConnection();
    const recipesCollection = await db.collection('recipes');
    const { _id } = user;

    const newRecipe = await recipesCollection
      .insertOne({ name, ingredients, preparation, userId: _id });

    return {
      name, ingredients, preparation, userId: _id, _id: newRecipe.insertedId, 
    };
  },
  
  async findAll() {
    const db = await mongoConnection();
    const recipesCollection = await db.collection('recipes');

    const recipes = await recipesCollection.find().toArray();

    return recipes;
  },
};