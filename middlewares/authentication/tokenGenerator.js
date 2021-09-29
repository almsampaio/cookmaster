const jwt = require('jsonwebtoken');

// Chave secreta usada para encriptografar os dados.
const secret = require('./mySecretJWT');

// Middleware que o login do usuário pelo email e password
const tokenGenerator = async (req, res, _next) => {
  const { password, ...userInfo } = req.user; // Desestrutura o objeto em duas partes: a primeira propriedade "password" e ...userInfo que contem o resto das propriedades
  const jwtConfig = {
    expiresIn: '2d', // tempo pelo qual esse token será válido (1d = 1 dia, 1h = 1 hora, 1m = 1 minuto );
    algorithm: 'HS256', // Algoritmo utilizado para assinar o token
  };
  const token = jwt.sign(userInfo, secret, jwtConfig);
  return res.status(200).json({ token });
};

module.exports = { tokenGenerator };
