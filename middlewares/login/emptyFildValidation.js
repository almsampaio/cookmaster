const errorsMessage = require('./loginErrors');

const { empty } = errorsMessage;

// Função que veririca se o email já existe (se é repetido);
const emptyFild = async (email, password) => {
  if (!email) { return true; }
  if (!password) { return true; }
  return false;
};

// Middleware que verifica se o email já existe
const emptyFildValidation = async (req, res, next) => {
  let errorCode;
  const { email, password } = req.body;
  try {
    if (await emptyFild(email, password)) {
      errorCode = empty.email.code;
      throw new Error(empty.email.message);
    }
  } catch (error) {
    return res.status(errorCode).json({ message: error.message });
  }
  next();
};

module.exports = { emptyFildValidation };
