const httpStatus = require('../utils/httpStatus');
const usersServices = require('../services/usersServices');

const getAllUsers = async (_req, res) => {
  const result = await usersServices.getAllUsers();
  res.status(httpStatus.ok).json({ users: result });
};

const getByEmail = async (req, res) => {
  const emails = await usersServices.getByEmail(req.body.email);

  res.status(httpStatus.ok).json({ email: emails });
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const {
    errorMessage,
    errorMessage2,
    errorMessageEmail,
    errorMsgEmailEmpty,
    token,
   } = await usersServices.loginUser(email, password);

  if (errorMessage) return res.status(httpStatus.unauthorized).json(errorMessage);

  if (errorMessage2) return res.status(httpStatus.unauthorized).json(errorMessage2);

  if (errorMessageEmail) return res.status(httpStatus.badRequest).json(errorMessageEmail);

  if (errorMsgEmailEmpty) return res.status(httpStatus.unauthorized).json(errorMsgEmailEmpty);

  res.status(httpStatus.ok).json({ token });
};

module.exports = {
  getAllUsers,
  getByEmail,
  createUser,
  loginUser,
};
