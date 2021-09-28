const db = require('../models/usersModel');

const createNewUserValidations = async (name, email, password) => {
  const emailValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  if (!name || !emailValidFormat.test(email) || !password) { 
    return { err:
      { message: 'Invalid entries. Try again.', code: 'BAD_REQUEST' } };
  }
  const emailAlreadyRegistered = await db.findByEmail(email);
  if (emailAlreadyRegistered) {
    return { err:
      { message: 'Email already registered', code: 'CONFLICT' } };
    }
  return true;
};

const createNewUser = async (body) => {
  let { role } = body;
  console.log(role);
  const { name, email, password } = body;
  if (!role) role = 'user';

  const isValid = await createNewUserValidations(name, email, password);
  if (isValid.err) return isValid; 

  const newUser = await db.createNewUser(name, email, password, role);
  return newUser;
};

module.exports = {
  createNewUser,
};