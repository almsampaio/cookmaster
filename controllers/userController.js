const { StatusCodes: { CREATED, CONFLICT } } = require('http-status-codes');
const userService = require('../services/userService');
// Pausa - ir ao plantão para verificar como validar se o email existe antes de cadastrar e retornar o erro solicitado evitando ao máximo poluir o MSC
const createNewUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
      const result = await userService.createNewUser({ name, email, password });
      res.status(CREATED).json({
        user: {
          name,
          email,
          role: 'user',
          _id: result.insertedId,
        },
      });    
  } catch (e) {
    next({ message: 'Email already registered', statusCode: CONFLICT });
  }
};

module.exports = {
  createNewUser,
};