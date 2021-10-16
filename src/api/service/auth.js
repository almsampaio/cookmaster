const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');
const { unauthorized } = require('../helpers/http');
const { findEmail } = require('../models/users');

const authService = async (data) => {
  if (!data.email || !data.password) return unauthorized('All fields must be filled');

  const user = await findEmail(data.email);
  if (!user) return unauthorized('Incorrect username or password');

  if (user.password !== data.password) return unauthorized('Incorrect username or password');

  const { _id: id, email, role } = user;
  return jwt.sign({ id, email, role }, jwtSecret);
};

module.exports = { authService };