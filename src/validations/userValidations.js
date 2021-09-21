const { findUserEmail } = require('../models/userModel');

const invalidEntries = {
  message: 'Invalid entries. Try again.',
};

const emailExist = {
  message: 'Email already registered',
};

const invalid = (name, email, password) => {
  if (!name || !email || !password) return true;
};

const emailInvalid = (email) => (!email.match(/\S+@\S+\.\S+/));

const checkEmail = async (email) => {
  const userEmail = await findUserEmail(email);
  if (userEmail) return true;
};

const validate = async (name, email, password) => {
  const code400 = 400;
  const code409 = 409;

switch (true) {
  case invalid(name, email, password): return { code: code400, message: invalidEntries };
  case emailInvalid(email): return { code: code400, message: invalidEntries };
  case (await checkEmail(email)): return { code: code409, message: emailExist };
 
  default: return {};
}
};

module.exports = { validate };