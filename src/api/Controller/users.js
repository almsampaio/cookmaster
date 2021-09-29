const Service = require('../Service');

async function register(req, res, next) {
  const { name, email, password } = req.body;
  const userToRegister = { name, email, password, role: 'user' };
  const serviceResponse = await Service.users.register(userToRegister);
  if (serviceResponse.error) return next(serviceResponse);
  return res.status(serviceResponse.statusCode).json(serviceResponse.payload);
}

module.exports = {
  register,
};
