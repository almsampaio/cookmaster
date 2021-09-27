const jwt = require('jsonwebtoken');

const secret = 'ihhhhSegredo';
  
const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  try {
  const decoded = jwt.verify(token, secret);
    const { data } = decoded;
    req.user = data;
    next();  
  } catch (e) {
    return res.status(401).json({ message: 'jwt malformed' }); 
  }
};

module.exports = {
  validateToken,
};