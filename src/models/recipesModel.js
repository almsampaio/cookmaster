const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const getById = async (id) => {
  const db = await connection();
  if (!ObjectID.isValid(id)) return false;
  const result = await db.collection('recipes').findOne({ _id: ObjectID(id) });
  return result;
};

const create = async (recipe) => {
  const db = await connection();
  const { ops } = await db.collection('recipes').insertOne(recipe);
  return ops[0];  
};

const update = async (recipeId, recipe) => {
  const { name, ingredients, preparation, userId } = recipe;
  const db = await connection();
  await db.collection('recipes').updateOne({ _id: ObjectID(recipeId) },
    { $set: { name, ingredients, preparation, userId } });
  const result = await getById(recipeId);
  return result;
};

const remove = async (id) => {
  const db = await connection();
  if (!ObjectID.isValid(id)) return false;
  await db.collection('recipes').deleteOne({ _id: id });
  return true;
};

const uploadImage = async (id, file) => {
  const db = await connection();
  const recipe = await getById(ObjectID(id));
  await db.collection('recipes').updateOne({ _id: ObjectID(id) },
    { $set: {
        name: recipe.name,
        ingredients: recipe.ingredients,
        preparation: recipe.preparation,
        userId: recipe.userId,
        image: `localhost:3000/${file.path}`,
      },
    });
  const updatedRecipe = await getById(ObjectID(id));
  return updatedRecipe;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  uploadImage,
};
