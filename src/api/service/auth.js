const { unauthorized } = require('../helpers/http');

const authService = async (data) => {
  if (!data.email || !data.password) return unauthorized('All fields must be filled');

  return data;
};

module.exports = { authService };