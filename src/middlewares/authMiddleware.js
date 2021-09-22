const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SECRET = 'Trybe';

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'missing auth token' });
  
    const payload = jwt.verify(token, SECRET);
  
    const user = await userModel.getByEmail(payload.email);

    const { password: _, ...userPayload } = user;

    req.user = userPayload;
  
    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};