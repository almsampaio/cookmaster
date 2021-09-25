const jwt = require('jsonwebtoken');

const SECRET = 'meusupersegredo';

const create = (user) => {
  // const payload = { ...user };
  const { password: _, ...payload } = user;

  const token = jwt.sign(payload, SECRET);
  return token;
};

const verify = (token) => {
  const payload = jwt.verify(token, SECRET);
  return payload;
};

module.exports = { create, verify };
