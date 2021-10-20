const usersService = require('../services/users');

const registerUser = async (req, res, next) => {
  const userData = req.body;

  const { result, error } = await usersService.registerUser(userData);

  if (error) return next(error);

  return res.status(201).json(result);
};

const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    const { role } = req.auth;

    const { result, error } = await usersService.registerAdmin({ name, email, password }, role);

    if (error) return next(error);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  } 
};

module.exports = {
  registerUser,
  registerAdmin,
};
