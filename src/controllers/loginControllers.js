const jwt = require('jsonwebtoken');
const {
  STATUS_OK,
  // STATUS_CREATE,
  // STATUS_BAD_REQUEST,
  // STATUS_UNAUTHORIZED,
  // STATUS_NOT_FOUND,
  // STATUS_UNPROCESSABLE,
  // STATUS_CONFLICT,
} = require('../utils/httpStatus');

const { serviceFoundByEmail } = require('../services/usersServices');

const SECRET = 'secret-validation-string';

const loginUser = async (req, res) => { // este controller só é chamada se o email e password forem válidos
  const { email } = req.body;
  const userFound = await serviceFoundByEmail(email);
  const { _id } = userFound;
  // busco usuário no banco se existir, se existir e as credenciais
  // baterem, loga o user.
  const payload = {
    name: userFound.name,
    email: userFound.email,
    _id,
    role: userFound.role,
  };
  const token = jwt.sign(payload, SECRET);
  return res.status(STATUS_OK).json({ token });
};

module.exports = {
  loginUser,
};