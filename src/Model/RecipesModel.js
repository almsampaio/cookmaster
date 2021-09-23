const connection = require('./connection');

const registration = (id, data) => {
  const newRecipe = { ...data, userId: id };
  return connection().then((db) => db.collection('recipes').insertOne(newRecipe))
    .then((recipe) => ({
      recipe: {
        ...newRecipe,
        _id: recipe.insertedId,
      },
    }));
};

const getAllRecipes = () => connection()
  .then((db) => db.collection('recipes').find().toArray())
  .then((recipes) => recipes);

module.exports = { registration, getAllRecipes };