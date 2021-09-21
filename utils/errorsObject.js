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

module.exports = {
  invalidEntries,
  emailAlreadyRegistered,
  AllFieldsMustBeFilled,
  incorrectUsernameOrPassword,
};