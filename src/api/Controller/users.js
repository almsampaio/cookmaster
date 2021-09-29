const Service = require('../Service');

async function register(req, res, next) {
  const { name, email, password } = req.body;
  const userToRegister = { name, email, password, role: 'user' };

  const serviceResponse = await Service.users.register(userToRegister);
  if (serviceResponse.error) return next(serviceResponse);
  const { statusCode, payload } = serviceResponse;

  return res.status(statusCode).json(payload);
}

module.exports = {
  register,
};
