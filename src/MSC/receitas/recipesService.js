const { insertOneRecipe } = require('./recipesModel');
const { findAUserWithEmail } = require('../users/usersModel');

function validateSingleField(field) {
  if (!field || field === '') return false;
  return true;
}

function validateFields({ name, ingredients, preparation }) {
  if (validateSingleField(name)
    && validateSingleField(ingredients)
    && validateSingleField(preparation)
  ) {
    return true;
  }
  return false;
}

async function postRecipe(recipe, user) {
  const validUser = await findAUserWithEmail(user.email);
  if (!validUser) return ({ statusCode: 400, message: 'jwt malformed' });
  const validFields = validateFields(recipe);
  if (!validFields) return ({ statusCode: 400, message: 'Invalid entries. Try again.' });
  const insertedRecipe = await insertOneRecipe(recipe);
  return insertedRecipe;
}

module.exports = {
  postRecipe,
};
