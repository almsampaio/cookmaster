const {
  // STATUS_OK,
  STATUS_CREATE,
  // STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  // STATUS_NOT_FOUND,
  // STATUS_UNPROCESSABLE,
  // STATUS_CONFLICT,
} = require('../utils/httpStatus');
const { serviceCreateUser } = require('../services/usersServices');

// const getAllUsers = async (_req, res) => {
//   const allUsers = ['etc'];
//   return res.status(201).json({ allUsers });
// };

// se este middleware foi chamado significa que o usuário pode ser cadastrado.
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const registeredUser = await serviceCreateUser({ name, email, password });
  if (registeredUser) {
    return res.status(STATUS_CREATE).json({ user: registeredUser });
  }
  return res.status(STATUS_UNAUTHORIZED).json({ message: 'Unknown error' });
};

module.exports = {
  // getAllUsers,
  registerUser,
};