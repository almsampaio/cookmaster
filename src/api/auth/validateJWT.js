const jwt = require('jsonwebtoken');

const secret = 'segredosupersecreto';

const { getByEmail } = require('../models/usersModel');

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) return res.status(401).json({ message: 'missing auth token' });

    const payload = jwt.verify(token, secret);

    const user = await getByEmail(payload.email);
    if (!user) return res.status(401).json({ message: 'jwt malformed' });
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { validateJWT };
