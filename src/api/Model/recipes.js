const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const connection = require('./connection');

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
  insertOneRecipe,
};
