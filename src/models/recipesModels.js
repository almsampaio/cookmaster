const { ObjectId } = require('mongodb');
const connection = require('./connection');

const defaultRecipe = ({ name, ingredients, preparation, userId, image, _id }) => {
  if (!image) {
    return { name, ingredients, preparation, userId, _id };
  }

  return { name, ingredients, preparation, userId, _id, image };
};

const postRecipes = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });

  const data = newRecipe.ops[0];

  return defaultRecipe(data);
};

const getRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();

  return recipes.map(defaultRecipe); 
};

const getRecipesById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const recipeId = ObjectId(id);
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: recipeId });

  return defaultRecipe(recipe);
};

const putRecipesById = async (id, name, ingredients, preparation) => {
  const recipeID = ObjectId(id);
  const db = await connection();

  await db.collection('recipes')
    .updateOne({ _id: recipeID }, { $set: { name, ingredients, preparation } });

  return getRecipesById(id);
};

const deleteRecipesbyId = async (id) => {
  const db = await connection();

  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const putImage = async (id, imageName) => {
  const imgPath = `localhost:3000/src/uploads/${imageName}`;
  const db = await connection();

  await db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { image: imgPath } });

  return getRecipesById(id);
};

module.exports = {
  postRecipes,
  getRecipes,
  getRecipesById,
  putRecipesById,
  deleteRecipesbyId,
  putImage,
};
