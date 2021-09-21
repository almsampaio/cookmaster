const mongoConnection = require('./connection');

const registerRecipe = async (name, ingredients, preparation, userId) => {
    const db = await mongoConnection.getConnection();
    const { insertedId: id } = await db.collection('recipes')
      .insertOne({ name, ingredients, preparation });
  
    return { recipe: {
      name,
      ingredients, 
      preparation,
      userId,
      _id: id,
    } };
};

module.exports = {
  registerRecipe,
};
