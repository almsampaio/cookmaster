const jwt = require('jsonwebtoken');
const secretToken = 'mySuperMegaSecretToken';

const validateAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, secretToken);
    console.log(decoded);
  } catch (_err) {
    return res.status(401).json({ message: 'Erro: seu token é inválido' });
  }

  next();
};

module.exports = {
  validateAuth,
};
