const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NO_BODY_STATUS = 422;
const HTTP_401 = 401;
const HTTP_NOT_FOUND_STATUS = 404;

const invEntries = { message: 'Invalid entries. Try again.' };
const alreadyEmail = { message: 'Email already registered' };
const invLogin = { message: 'Incorrect username or password' };
const allSpacesValidate = { message: 'All fields must be filled' };
const recipeNotFound = { message: 'recipe not found' };

module.exports = {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_NO_BODY_STATUS,
  HTTP_401,
  HTTP_NOT_FOUND_STATUS,
  invEntries,
  alreadyEmail,
  invLogin,
  allSpacesValidate,
  recipeNotFound,
};
