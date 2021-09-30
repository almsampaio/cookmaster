const Service = require('../Service');

async function logIN(req, res, next) {
  const { email, password } = req.body;
  const user = { email, password };

  const serviceResponse = await Service.login.logIN(user);
  const { statusCode, payload } = serviceResponse;

  if (payload.error) return next({ statusCode, error: payload.error });
  return res.status(statusCode).json(payload);
}

module.exports = {
  logIN,
};
