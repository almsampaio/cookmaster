const jwt = require('jsonwebtoken');
const { JWT_MALFORMED, ERROR_MISSING_TOKEN } = require('../helpers');
const models = require('../models');
const { secret } = require('./loginService');

const tokenValidation = async (token) => {
  if (!token) return ERROR_MISSING_TOKEN;
  
  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    const { email } = decoded.data;
    const user = await models.usersModel.usersByEmail(email);

    if (!user) return JWT_MALFORMED;
    return { data: decoded.data };
  } catch (error) { 
    return JWT_MALFORMED;
  }
};

module.exports = { tokenValidation };
