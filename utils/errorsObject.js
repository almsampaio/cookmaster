const invalidEntries = {
  message: 'Invalid entries. Try again.',
  status: 400,
};

const emailAlreadyRegistered = {
  message: 'Email already registered',
  status: 409,
};

const AllFieldsMustBeFilled = {
  message: 'All fields must be filled',
  status: 401,
};

const incorrectUsernameOrPassword = {
  message: 'Incorrect username or password',
  status: 401,
};

const jwtMalformed = {
  message: 'jwt malformed',
  status: 401,
};

const missingAuthToken = {
  message: 'missing auth token',
  status: 401,
};

const notFound = {
  message: 'recipe not found',
  status: 404,
};

const editionUnauthorized = {
  message: 'This user cannot edit this recipe',
  status: 401,
};

module.exports = {
  invalidEntries,
  emailAlreadyRegistered,
  AllFieldsMustBeFilled,
  incorrectUsernameOrPassword,
  jwtMalformed,
  notFound,
  editionUnauthorized,
  missingAuthToken,
};