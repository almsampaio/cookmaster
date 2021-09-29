const services = require('../services');

const registerUser = async (req, res, _next) => {
  const { name, email, password, role } = req.body;
  const createdUser = await services.registerUser({ name, email, password, role });

  return res.status(201).json({ user: createdUser });
};

module.exports = {
  registerUser,
};
