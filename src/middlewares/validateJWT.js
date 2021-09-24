const jwt = require('jsonwebtoken');
const { findUser } = require('../models/usersModel');

const segredo = 'bem-te-vi';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado ou informado' });
  }

  try {
    const decoded = jwt.verify(token, segredo);
    const user = await findUser(decoded.data.email);

    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuario do token.' });
    }

    req.user = user;
    next();
  } catch (_err) {
    return res.status(401).json({ message: 'Erro: Seu token é inválido.' });
  }
};

module.exports = { validateJWT };
