const usersModels = require('../models/usersModels');

const emailVerify = async (request, response, next) => {
  const { email } = request.body;
  
  if (!email || email === '') {
    return response.status(401).json({ message: 'All fields must be filled' });
  }

  next();
};

const passwordVerify = async (request, response, next) => {
  const { password } = request.body;
  
  if (!password || password === '') {
    return response.status(401).json({ message: 'All fields must be filled' });
  }

  next();
};

const emailVerifyValid = async (request, response, next) => {
  const { email } = request.body;
  
  const pattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
  const comparePattern = email.match(pattern);
  if (!comparePattern) {
    return response.status(401).json({ message: 'Incorrect username or password' });
  }

  next();
};

const passwordVerifyValid = async (request, response, next) => {
  const { password } = request.body;
  
  const searchByPassword = await usersModels.searchByPassword(password);
  if (!searchByPassword) {
    return response.status(401).json({ message: 'Incorrect username or password' });
  }

  next();
};

module.exports = {
  emailVerify,
  passwordVerify,
  emailVerifyValid,
  passwordVerifyValid,
};
