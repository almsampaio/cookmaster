// const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { StatusCodes: { UNAUTHORIZED } } = require('http-status-codes');
const model = require('../models/usersModel');

require('dotenv').config();

const SECRET = process.env.SECRET || 'minhasenhasegura';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, SECRET);

    const user = await model.findOnebyEmail(decoded.data.email);
    if (!user) {
      return res.status(UNAUTHORIZED)
        .json({ message: 'jwt malformed' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: error.message });
  }
};