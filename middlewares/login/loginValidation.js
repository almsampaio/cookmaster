const usersServices = require('../../services/usersServices');
const errorsMessage = require('./loginErrors');

const { invalid } = errorsMessage;

// Função que veririca se o usuário existe e se a senha é válida
// const searchLogin = async (email) => {
//   const user = await usersServices.getByProperty('email', email);
//   return user;
// };

// Função que veririca se o usuário existe e se a senha é válida
const searchLogin = async (email, password) => {
  const user = await usersServices.getByProperty('email', email);
  if (user === null) { return true; } // Se o email não existir, retorna null
  if (user.password !== password) { return true; }
  return user;
};

// Middleware que o login do usuário pelo email e password
const loginValidation = async (req, res, next) => {
  let errorCode;
  const { email, password } = req.body;
  const user = await searchLogin(email, password);
  try {
    if (user === true) {
      errorCode = invalid.email.code;
      throw new Error(invalid.email.message);
    }
    req.user = user;
  } catch (error) {
    return res.status(errorCode).json({ message: error.message });
  }
  next();
};

module.exports = { loginValidation };
