const jwt = require('jsonwebtoken');
const { findEmail } = require('../models/usersModel');
const { invalidUser } = require('../utils/messages');
const { UNAUTHORIZED } = require('../utils/statusErrors');
const { secret } = require('../utils/tokenConfigs');

const verifyToken = async (request, response, next) => {
  const token = request.headers.authorization;
  // console.log(token);

  try {
    const payload = jwt.verify(token, secret);

    const user = await findEmail(payload.email);

    if (!user) throw invalidUser;

    const { password, ...userWithoutPassword } = user;

    request.user = userWithoutPassword;
    next();
  } catch (err) {
    return next({ status: UNAUTHORIZED, message: err.message });
  }
};

module.exports = verifyToken;
