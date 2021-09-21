const httpStatus = require('../utils/httpStatus');
const usersServices = require('../services/usersServices');

const getAllUsers = async (_req, res) => {
  const result = await usersServices.getAllUsers();
  res.status(httpStatus.ok).json({ users: result });
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const {
    errorMessage,
    emailerrorMessage,
    createdUser,
  } = await usersServices.createUser(name, email, password, role);

  if (errorMessage) {
    return res.status(httpStatus.badRequest).json(errorMessage);
  }

  if (emailerrorMessage) {
    return res.status(httpStatus.conflict).json(emailerrorMessage);
  }

  res.status(httpStatus.created).json(createdUser);
};

module.exports = {
  getAllUsers,
  createUser,
};
