const jwt = require('jsonwebtoken');
const User = require('../../Models/usersModel');
const { builtError } = require('../../Services/usersServices');

module.exports = async (req, _res, next) => {
  const { authorization: token } = req.headers;
  const secret = 'Apenas_para_fins_didaticos_:)';
  if (!token) {
    return next(builtError(401, 'missing auth token'));
  }
  try {
    const { data: { email } } = jwt.verify(token, secret);
    const user = await User.findByEmail(email);
    if (!user) return builtError(401, 'jwt malformed');
    req.user = user;
    next();
  } catch ({ message }) {
    return next(builtError(401, message));
  }
};
