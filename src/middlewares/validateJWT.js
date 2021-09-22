const jwt = require('jsonwebtoken');

const secret = 'senhaSecretaDoProjeto';

const validateJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, secret);
    const { data: { _id } } = payload;
    req.userId = _id;
    next();
  } catch (error) {
  return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;