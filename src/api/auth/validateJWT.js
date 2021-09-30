const jwt = require('jsonwebtoken');

const segredo = 'seusecretdetoken';
module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'missing auth token' });
  }

  try {
    const { data } = jwt.verify(authorization, segredo);

    req.user = data;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};