// validateJWT.js
const jwt = require('jsonwebtoken');
const model = require('../../models/users');

const secret = 'secretToken';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || token === ' ') {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
        const decoded = jwt.verify(token, secret);
       
    const user = await model.findByEmail(decoded.data.email);
    
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { validateJWT };