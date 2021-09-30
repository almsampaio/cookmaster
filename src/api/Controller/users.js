const Service = require('../Service');

async function register(req, res, next) {
  const { name, email, password } = req.body;
  const userToRegister = { name, email, password, role: 'user' };

  const serviceResponse = await Service.users.register(userToRegister);
  const { statusCode, payload } = serviceResponse;

  if (payload.error) return next({ statusCode, error: payload.error });
  return res.status(statusCode).json(payload);
}

module.exports = {
  register,
};
