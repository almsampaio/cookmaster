const Service = require('../Service');

async function logIN(req, _res, next) {
  const { email, password } = req.body;
  const user = { email, password };

  const serviceResponse = await Service.login.logIN(user);
  if (serviceResponse.error) {
    const { statusCode, error } = serviceResponse;
    return next({ statusCode, error });
  }
  req.infos = serviceResponse;
  return next();
}

module.exports = {
  logIN,
};
