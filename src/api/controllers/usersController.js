const service = require('../services/usersService');

const status = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  SERVER_ERROR: 500,
};

const createNewUser = async (req, res) => {
  const { body } = req;
  const newUser = await service.createNewUser(body);
  if (newUser.err) {
    return res.status(status[newUser.err.code]).json({ message: newUser.err.message });
  }
  return res.status(status.CREATED).json(newUser);
};

const userLogin = async (req, res) => {
  const { body: { email, password } } = req;
  const response = await service.userLogin(email, password);
  if (response.err) {
    return res.status(status[response.err.code]).json({ message: response.err.message });
  }
  return res.status(status.OK).json(response);
};

module.exports = {
  createNewUser,
  userLogin,
};
