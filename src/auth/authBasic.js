const jwtVarify = require('./jwtFunctions');
const modelsUsers = require('../models/usersModels');

const err = {
  // fieldRequired: 'Invalid entries. Try again.',
  jwtMalformed: 'jwt malformed',
};

const validToken = async (token) => {
  try {
    const verifyToken = jwtVarify.verify(token);

    const user = await modelsUsers.findByEmail(verifyToken.email);

    if (!user) return { message: err.jwtMalformed };

    const { _id } = user;

    return { id: _id };
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = { validToken };
