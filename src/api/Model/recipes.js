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

module.exports = {
  findRecipes,
  findOneRecipeById,
  insertOneRecipe,
};
