const mongoConnection = require('./connection');

module.exports = {
  async create(name, ingredients, preparation, user) {
    const db = await mongoConnection();
    const userCollection = await db.collection('recipes');
    const { _id } = user;

    const newRecipe = await userCollection
      .insertOne({ name, ingredients, preparation, userId: _id });

    return {
      name, ingredients, preparation, userId: _id, _id: newRecipe.insertedId, 
    };
  },
  
};