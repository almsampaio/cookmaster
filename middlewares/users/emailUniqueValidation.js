const usersServices = require('../../services/usersServices');

// Função que veririca se o email já existe (se é repetido);
const emailAlreadyExists = async (email) => {
  const result = await usersServices.getByProperty('email', email);
  if (result !== null) { return true; }
  if (result === null) { return false; }
};

// Middleware que verifica se o email já existe
const emailUniqueValidation = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (await emailAlreadyExists(email)) {
      throw new Error('Email already registered');
    }
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
  next();
};

module.exports = { emailUniqueValidation };
