const jwt = require('jsonwebtoken');
const { findEmail } = require('../models/usersModel');
const { INVALID_JWT } = require('../utils/errorMessages');
const { invalidUser } = require('../utils/messages');
const { UNAUTHORIZED } = require('../utils/statusClientErrors');
const { secret } = require('../utils/tokenConfigs');

const verifyToken = async (request, response, next) => {
  const token = request.headers.authorization;

  try {
    const payload = jwt.verify(token, secret);

    const user = await findEmail(payload.email);

    if (!user) throw invalidUser;

    const { password, ...userWithoutPassword } = user;

    request.user = userWithoutPassword;
    next();
  } catch (err) {
    return { status: UNAUTHORIZED, message: INVALID_JWT };
  }
};

module.exports = verifyToken;
