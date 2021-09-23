const connection = require('./connection');

const registration = (id, data) => {
  console.log('ID', id);
  const newRecipe = {
    ...data,
    userId: id,
  };
  return connection().then((db) => db.collection('recipes').insertOne(newRecipe))
    .then((recipe) => ({
      recipe: {
        ...newRecipe,
        _id: recipe.insertedId,
      },
    }));
};

module.exports = { registration };