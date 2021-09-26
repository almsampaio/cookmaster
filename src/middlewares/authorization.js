const jwt = require('jsonwebtoken');

const SECRET = 'minhasenha';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const payload = jwt.verify(token, SECRET);
    const { _id } = payload;

    req.userId = _id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'jwt malformed' });
  }
};
