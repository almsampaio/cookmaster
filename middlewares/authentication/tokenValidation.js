const jwt = require('jsonwebtoken');
const recipesServices = require('../../services/usersServices');

const secret = require('./mySecretJWT'); // Chave secreta usada para encriptografar os dados.

const tokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) { throw new Error('missing auth token'); }
  try {
    const decoded = jwt.verify(token, secret); // O método verify, verifica a validação e decodificar o token JWT. Caso o token esteja expirado, a própria biblioteca irá retornar um erro.
    const user = await recipesServices.getByProperty('email', decoded.email); // Se o token é válido, buscar o usuário no bando de dados.
    if (user === null || !user) { throw new Error('jwt malformed'); }
    const { _id: userId, role } = user;
    req.userInfo = { userId, role }; // Disponibilizando o user para outros middlewares
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = { tokenValidation };

// DESCRIPTOGRAFANDO O TOKEN JWT
/*
# 1. Pelo terminal:
  echo 'tokenJWT' | base64 --decode
*/

/*
# 2. Pelo pacote jsonwebtoken, dentro do node.js:
const decode = jwt.verify(token, secret)
// A variável decoded retorna o seguinte objeto:

{ _id: '614f93d4731b88de6cfb03e6',        // Valor de entrada na criaçaõ do token
  name: 'Erick Jacquin',                  // Valor de entrada na criaçaõ do token
  email: 'erickjacquin@gmail.com',        // Valor de entrada na criaçaõ do token
  role: 'user',                           // Valor de entrada na criaçaõ do token
  iat: 1632802338,                        // Tipo do Algorítimo de criptografia
  exp: 1632975138                         // Prazo de para o token expirar
}

// O retorno do decode, são os mesmos parâmetros utilizados na criação do token.
// NUNCA usar o password do usuário para gerar o token!
*/
