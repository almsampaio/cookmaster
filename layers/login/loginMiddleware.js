const usersServices = require('../users/usersServices');

// Função que veririca se o email já existe (se é repetido);
const emptyFild = async (email, password) => {
  if (!email) { return true; }
  if (!password) { return true; }
  return false;
};

// Middleware que verifica se o email já existe
const emptyFildValidation = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (await emptyFild(email, password)) {
      throw new Error('All fields must be filled');
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
  next();
};

// Função que veririca se o usuário existe e se a senha é válida
const searchLogin = async (email, password) => {
  const user = await usersServices.getByProperty('email', email);
  if (user === null) { return true; } // Se o email não existir, retorna null
  if (user.password !== password) { return true; }
  return user;
};

// Middleware que o login do usuário pelo email e password
const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await searchLogin(email, password);
  try {
    if (user === true) {
      throw new Error('Incorrect username or password');
    }
    req.user = user;
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
  next();
};

module.exports = { emptyFildValidation, loginValidation };