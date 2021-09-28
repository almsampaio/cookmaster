const jwt = require('jsonwebtoken');
const { getUser } = require('../models/userModel');

const key = 'your-secret-key';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) { return res.status(401).json({ message: 'missing auth token' }); }
  try {
    const decrypt = jwt.verify(token, key);
    console.log(decrypt);
    const user = await getUser({ email: decrypt.data.email, password: decrypt.data.password });
    if (!user) {
      return res.status(401).json({ message: 'JWT' }); 
    }
    req.user = user;
    console.log(req.user);
    next();
  } catch (_err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateToken; 