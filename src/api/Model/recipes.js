const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function findRecipes() {
  try {
    const db = await connection();
    const queryResponse = await db.collection('recipes').find().toArray();
    return queryResponse;
  } catch (err) {
    console.log(err);
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return { statusCode, error: { message: getReasonPhrase(statusCode) } };
  }
}

async function findOneRecipeById(id) {
  if (!ObjectId.isValid(id)) {
    const statusCode = StatusCodes.NOT_FOUND;
    return { statusCode, error: { message: 'recipe not found' } };
  }
  try {
    const db = await connection();
    const queryResponse = await db.collection('recipes').findOne(new ObjectId(id));
    return queryResponse;
  } catch (err) {
    console.log(err);
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return { statusCode, error: { message: getReasonPhrase(statusCode) } };
  }
}

async function insertOneRecipe(recipeToInsert) {
  try {
    const db = await connection();
    const queryResponse = await db.collection('recipes').insertOne(recipeToInsert);
    const { ops: [insertedRecipe] } = queryResponse;
    return insertedRecipe;
  } catch (err) {
    console.log(err);
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return { statusCode, error: { message: getReasonPhrase(statusCode) } };
  }
}

async function updateOneRecipe(id, recipeToInsert) {
  try {
    const db = await connection();
    const queryResponse = await db.collection('recipes')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { ...recipeToInsert } },
        { returnOriginal: false }, // https://stackoverflow.com/questions/24747189/update-and-return-document-in-mongodb
      );  
    return queryResponse.value;
  } catch (err) {
    console.log(err);
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return { statusCode, error: { message: getReasonPhrase(statusCode) } };
  }
}

async function deleteOneRecipe(id) {
  try {
    const db = await connection();
    const queryResponse = await db.collection('recipes')
      .findOneAndDelete({ _id: ObjectId(id) });
    return queryResponse;
  } catch (err) {
    console.log(err);
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return { statusCode, error: { message: getReasonPhrase(statusCode) } };
  }
}

async function updateImage(id, image) {
  const db = await connection();
  const { value } = await db
  .collection('recipes')
  .findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { image } },
    { returnOriginal: false },
    );
  return value;
}

module.exports = {
  findRecipes,
  findOneRecipeById,
  insertOneRecipe,
  updateOneRecipe,
  deleteOneRecipe,
  updateImage,
};
