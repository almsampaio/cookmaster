const jwt = require('jsonwebtoken');
const UsersModel = require('../models/Users');

const secret = 'tokensecret'; 

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await UsersModel.findUserByEmail(decoded.data.email);

    if (!user) {
      return res
      .status(401).json({ message: 'jwt malformed' });
    }
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};