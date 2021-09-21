const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const model = require('../models/usersModel');
require('dotenv').config();

const SECRET = process.env.SECRET || 'seusecretdetoken';

module.exports = rescue(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }
    const decoded = jwt.verify(token, SECRET);
    const user = await model.findOnebyEmail(decoded.data.email);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;

    next();
});