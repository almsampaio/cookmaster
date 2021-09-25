const usersModel = require('../models/usersModels');

const nameVerify = async (request, response, next) => {
  const { name } = request.body;
  if (!name || name === '') {
    return response.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const emailVerify = async (request, response, next) => {
  const { email } = request.body;
  
  if (!email || email === '') {
    return response.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  
  const pattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
  const comparePattern = email.match(pattern);
  if (!comparePattern) {
    return response.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const emailVerifyExists = async (request, response, next) => {
  const { email } = request.body;
  
  const searchByEmail = await usersModel.searchByEmail(email);
  if (searchByEmail) return response.status(409).json({ message: 'Email already registered' });
  next();
};
module.exports = {
  nameVerify,
  emailVerify,
  emailVerifyExists,
};
