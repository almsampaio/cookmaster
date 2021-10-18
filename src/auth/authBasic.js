const jwtVerify = require('./jwtFunctions');
const modelLogin = require('../models/login');

const err = {
  jwtMalformed: 'jwt malformed',
};

const validToken = async (token) => {
  try {
    const checkToken = jwtVerify.verify(token);
    const user = await modelLogin.searchEmailUser(checkToken.email);
    if (!user) return { message: err.jwtMalformed };
    const { _id } = user;
    return _id;
  } catch (e) {
    return { message: e.message };
  }
};

module.exports = {
  validToken,
};
