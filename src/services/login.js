const validate = require('../validation/login');
const { validToken } = require('../validation/token');

const create = async (credentials) => {
  const userData = await validate.login(credentials);
  const result = validToken(userData);
  return { token: result };
};

module.exports = {
  create,
};