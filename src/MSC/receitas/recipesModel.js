const connection = require('../Connection');

async function insertOneRecipe(recipeToInsert) {
  try {
    const db = await connection();
    const queryResponse = await db.collection('recipes').insertOne(recipeToInsert);
    const { ops: [insertedProduct] } = queryResponse;
    return insertedProduct;
  } catch (err) {
    console.log(err);
    return {
      err,
    };
  }
}

module.exports = {
  insertOneRecipe,
};
