const jwt = require('jsonwebtoken');

const SECRET = 'mysecretultrasecret';

const create = (user) => {
  const { password_, ...payload } = user;
  const token = jwt.sign(payload, SECRET);
  return token;
};

const verify = (token) => {
  const payload = jwt.verify(token, SECRET);
  return payload;
};

module.exports = {
  create,
  verify,
};
