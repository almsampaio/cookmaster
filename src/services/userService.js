const userModel = require('../models/userModel');

const validateEntries = (name, email, password) => {
  const invalidEntriesError = { code: 400, message: 'Invalid entries. Try again.' };
  const regex = /\S+@\S+\.\S+/;
  if (!name || !email || !password || regex.test(email) === false) {
  return { err: invalidEntriesError };
}
  return null;
};

const checkEmail = async (email) => {
  const unavailableEmailError = { code: 409, message: 'Email already registered' };
  const sameEmail = await userModel.findEmail(email);
  if (sameEmail) return { err: unavailableEmailError };
  return null;
};

const create = async (name, email, password) => {
  const invalidEntries = validateEntries(name, email, password);
  if (invalidEntries !== null) return invalidEntries;
  const unavailableEmail = await checkEmail(email);
  if (unavailableEmail !== null) return unavailableEmail;
  const insertedUser = await userModel.create(name, email, password);
  const HTTP_CREATED_STATUS = 201;
  const createResult = { newUser: insertedUser, status: HTTP_CREATED_STATUS };
  return createResult;
};

module.exports = {
  create,
};
