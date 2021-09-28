const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

const SECRET = 'minhasenha';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const payload = jwt.verify(token, SECRET);
    const { email } = payload;

    const validatePayload = await userModel.find(email);
    if (!validatePayload) {
      res.status(401).json({ message: 'jwt malformed' });
    }

    req.user = payload;

    next();
  } catch (error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};
