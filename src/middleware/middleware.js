const { verify } = require('jsonwebtoken');
const { SECRET } = require('../util/util');

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!email || validEmail.test(email) === false) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const authToken = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const { user: { _id } } = verify(token, SECRET);

    req.user = { _id };

    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  isValidEmail,
  authToken,
};