const { ObjectId } = require('mongodb');
const getConnection = require('./connections');

const createRecipes = async (recipe, id) => {
  const create = { ...recipe, userId: id };
  const db = await getConnection();
  const newRecipe = await db.collection('recipes').insertOne(create);
  return ({ ...create, _id: newRecipe.insertedId });
};

const getAllRecipes = async () => {
  const db = await getConnection();
  const allRecipes = await db.collection('recipes').find().toArray();
  return allRecipes;
};

const getRecipesId = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await getConnection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const updateRecipes = async ({ name, ingredients, preparation }, _id, id) => {
   if (!ObjectId.isValid(_id)) return false;
  const updated = { name, ingredients, preparation };
  console.log(updated);
  const db = await getConnection();
  const updateId = await db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  if (!updateId) {
    return false;
  }
  return { _id: ObjectId(id), name, ingredients, preparation, userId: _id };
};
const deleteRecipes = async (id) => {
  const db = await getConnection();
  const deleteId = await db.collection('recipes')
  .deleteOne({ _id: ObjectId(id) });
  return deleteId;
};

const updateImg = async (id, image) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await getConnection();
  const addImg = await db.collection('recipes')
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { image } }, { returnOriginal: false });
  if (addImg.value.image === image) {
    return addImg.value;
  }
  return false;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipesId,
  updateRecipes,
  deleteRecipes,
  updateImg,
};