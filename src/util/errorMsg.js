const invalidEntries = {
  message: 'Invalid entries. Try again.',
};

const conflict = {
  message: 'Email already registered',
};

const missingFields = {
  message: 'All fields must be filled',
};

const invalidData = {
  message: 'Incorrect username or password',
};

const badJwt = {
  message: 'jwt malformed',
};

const recipeNotFound = {
  message: 'recipe not found',
};

const noToken = {
  message: 'missing auth token',
};

const unauth = {
  message: 'not your recipe or not admin',
};

module.exports = {
  invalidEntries,
  conflict,
  missingFields,
  invalidData,
  badJwt,
  recipeNotFound,
  noToken,
  unauth,
};
