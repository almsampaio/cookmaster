const Jwt = require('jsonwebtoken');
const { findUser } = require('../../models/UsersModel');
const { HTTP_UNAUTHORIZED, HTTP_PAYMENT_REQUIRED } = require('../../utils/utils');

const JWT_SECRET = 'segredoentrenois';

const validateUserWithToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(HTTP_UNAUTHORIZED).json({ message: 'missing auth token' });

  try {
    const decoded = Jwt.verify(token, JWT_SECRET);
    const user = await findUser(decoded.user.email);
    if (!user) {
      return res
        .status(HTTP_PAYMENT_REQUIRED)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;

    return next();
  } catch (error) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validateUserWithToken,
};
