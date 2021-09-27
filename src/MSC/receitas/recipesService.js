const { insertOneRecipe } = require('./recipesModel');

function validateSingleField(field) {
  if (!field || field === '') return false;
  return true;
}

function validateFields(name, ingredients, preparation) {
  if (validateSingleField(name)
    && validateSingleField(ingredients)
    && validateSingleField(preparation)
  ) {
    return true;
  }
  return false;
}

async function postRecipe(name, ingredients, preparation) {
  const validFields = validateFields(name, ingredients, preparation);
  if (!validFields) return ({ statusCode: 400, message: 'Invalid entries. Try again.' });
  const insertedRecipe = await insertOneRecipe(name, ingredients, preparation);
  return insertedRecipe;
}

module.exports = {
  postRecipe,
};
