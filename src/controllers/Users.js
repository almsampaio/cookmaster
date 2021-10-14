const usersService = require('../services/Users');
const { newUserValidation, loginBodyValidation } = require('../middlewares/Users');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  newUserValidation(name, email, password);
  const result = await usersService.createUser(name, email, password, 'user');

  if (!result) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }

  return res.status(201).json({
    user: result,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  loginBodyValidation(email, password);
  const token = await usersService.login(email, password);
  return res.status(200).json({
    token,
  });
};

module.exports = {
  createUser,
  login,
};