const usersService = require('../services/Users');
const { newUserValidation } = require('../middlewares/Users');

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

module.exports = {
  createUser,
};