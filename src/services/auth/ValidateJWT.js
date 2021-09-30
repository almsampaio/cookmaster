const jwt = require('jsonwebtoken');
const model = require('../../models/Usuarios');

const JWT_SECRET = 'segredaonosso';
const strinAuth = 'authorization';

module.exports = async (req, res, next) => {
  const token = req.headers[strinAuth];
  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await model.findUser(decoded.user.email);
    if (!user) return res.status(402).json({ message: 'Erro ao procurar usuário do token.' });
    req.user = user;

    next();
  } catch (e) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
