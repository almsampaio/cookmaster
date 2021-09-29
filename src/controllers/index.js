const services = require('../services');

const registerUser = async (req, res, _next) => {
  const { name, email, password, role } = req.body;
  const createdUser = await services.registerUser({ name, email, password, role });

  return res.status(201).json({ user: createdUser });
};

const logUserIn = async (req, res, _next) => {
  const { email, password } = req.body;
  const token = await services.logUserIn({ email, password });

  return res.status(200).json({ token });
};

module.exports = {
  registerUser,
  logUserIn,
};
