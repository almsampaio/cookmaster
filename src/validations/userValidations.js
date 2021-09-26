const { findUserEmail } = require('../models/userModel');

const invalidEntries = {
  message: 'Invalid entries. Try again.',
};

const emailExist = {
  message: 'Email already registered',
};

const mandatoryEntries = {
  message: 'All fields must be filled',
};

const IncorrectData = {
  message: 'Incorrect username or password',
};

const mandatoryCreate = (name, email, password) => {
  if (!name || !email || !password) return true;
};

const mandatoryLogin = (email, password) => {
  if (!email || !password) return true;
};

const emailInvalid = (email) => (!email.match(/\S+@\S+\.\S+/));

const checkEmail = async (email) => {
  const userEmail = await findUserEmail(email);
  if (userEmail) return true;
};

const checkLogin = async (email, password) => {
  const user = await findUserEmail(email);
  if (!user || user.email !== email || user.password !== password) return true;
};

const validate = async (name, email, password) => {
  const code400 = 400;
  const code409 = 409;

switch (true) {
  case mandatoryCreate(name, email, password): return { code: code400, message: invalidEntries };
  case emailInvalid(email): return { code: code400, message: invalidEntries };
  case (await checkEmail(email)): return { code: code409, message: emailExist };
 
  default: return {};
}
};

const validateLogin = async (email, password) => {
  const code401 = 401;
  
switch (true) {
  case mandatoryLogin(email, password): return { code: code401, message: mandatoryEntries };
  case (await checkLogin(email, password)): return { code: code401, message: IncorrectData };
  
  default: return {};
}
};

module.exports = { 
  validate,
  validateLogin,
 };