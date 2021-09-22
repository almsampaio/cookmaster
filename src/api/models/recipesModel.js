const { ObjectId } = require('mongodb');
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

  async findById(id) {
    const db = await mongoConnection();
    const recipesCollection = await db.collection('recipes');

    if (!ObjectId.isValid(id)) {
      return null;
    }

    const recipe = await recipesCollection.findOne({ _id: ObjectId(id) });

    return recipe;
  },

  async edit(id, name, ingredients, preparation) {
    const db = await mongoConnection();
    const recipesCollection = await db.collection('recipes');

    if (!ObjectId.isValid(id)) {
      return null;
    }

    await recipesCollection
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

    return { _id: id, name, ingredients, preparation };
  },
};