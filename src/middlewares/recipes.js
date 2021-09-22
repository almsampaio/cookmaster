const { verify } = require('jsonwebtoken');

const SECRET = 'segredomegasecreto123';

const authToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  try {
    const { data } = verify(token, SECRET);
    req.user = data;
  } catch (e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
  next();
};

module.exports = {
  authToken,
};