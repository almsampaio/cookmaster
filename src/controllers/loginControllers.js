const {
  STATUS_OK,
  // STATUS_CREATE,
  // STATUS_BAD_REQUEST,
  // STATUS_UNAUTHORIZED,
  // STATUS_NOT_FOUND,
  // STATUS_UNPROCESSABLE,
  // STATUS_CONFLICT,
} = require('../utils/httpStatus');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { Authorization } = req.Authorization;
  // busco usuário no banco se existir, se existir e as credenciais
  // baterem, loga o user.
  if (Authorization && email && password) {
    console.log('Ok!');
  }
  return res.status(STATUS_OK).json({ message: 'teste' });
};

module.exports = {
  loginUser,
};