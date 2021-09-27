const { userRegisterModel, findAUserWithEmail } = require('./usersModel');

function checkNotEmptyField(field) {
  if (!field || field === '') return false;
  return true;
}

function validateUserFields(name, password) {
  if (!checkNotEmptyField(name)) return false;
  if (!checkNotEmptyField(password)) return false;
  return true;
}

function validateEmail(email) {
  if (!checkNotEmptyField(email)) return false;
  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const test = EMAIL_REGEX.test(email);
  return test;
}

async function userRegisterService({ name, email, password }) {
  const validUser = validateUserFields(name, password);
  const validEMail = validateEmail(email);
  if (!validUser || !validEMail) return { statusCode: 400, message: 'Invalid entries. Try again.' };
  
  const existsInDB = await findAUserWithEmail(email);
  if (!existsInDB) {
    const registeredUser = await userRegisterModel({ name, email, password, role: 'user' });
    return { user: registeredUser };
  }
  if (existsInDB.err) {
    return { statusCode: 500, message: 'Internal Database Error' };
  }
  return { statusCode: 409, message: 'Email already registered' };
}

module.exports = {
  userRegisterService,
};
