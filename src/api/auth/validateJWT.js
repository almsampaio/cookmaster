// validateJWT.js
const jwt = require('jsonwebtoken');
const model = require('../../models/usersModel');

const SECRET = '5UP3R53CR374';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await model.findUser(decoded.data.email);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'jwt malformed' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
