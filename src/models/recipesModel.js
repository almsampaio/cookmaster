const connection = require('./connection');

const generalDB = async () => {
  const data = await connection().then((db) => db.collection('recipes'));
  return data;
};

const addNewRecipe = async (recipeData) => {
  const {
    user,
    name,
    ingredients,
    preparation,
  } = recipeData;

  const data = await generalDB();
  console.log(name, user);

  const { _id } = user;

  const userId = _id;

  return data.insertOne({ name, ingredients, preparation, userId })
      .then((result) => ({
        name,
        ingredients,
        preparation,
        userId,
        _id: result.insertedId,
      }));
};

const getAllRecipes = async () => {
  const data = await generalDB();

  return data.find().toArray();
};

module.exports = {
  addNewRecipe,
  getAllRecipes,
};
