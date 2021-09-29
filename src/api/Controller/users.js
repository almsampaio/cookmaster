const Service = require('../Service');

async function register(_req, res, _next) {
  const serviceResponse = await Service.users.register();
  return res.status(serviceResponse.statusCode).json(serviceResponse.payload);
}

module.exports = {
  register,
};
