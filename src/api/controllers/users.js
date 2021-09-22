const usersServices = require('../services/users');

const createUsers = async (req, res, next) => {
  const { name, email, password } = req.body;
  const CreateUsers = await usersServices.createUsers({ name, email, password });
  
  if (CreateUsers.error) return next(CreateUsers);

  res.status(201).json(CreateUsers);
};

const loginUsers = async (req, res, next) => {
  const { email, password } = req.body;
  const LoginUsers = await usersServices.loginUsers({ email, password });
  
  if (LoginUsers.error) return next(LoginUsers);
  
  res.status(200).json({ token: LoginUsers });
};

module.exports = {
  createUsers,
  loginUsers,
};