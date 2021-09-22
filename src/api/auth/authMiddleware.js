const jwt = require('jsonwebtoken');

const SECRET = 'meusupersegredo';

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;

  const payload = jwt.verify(token, SECRET);
  console.log(payload);
  next();
};