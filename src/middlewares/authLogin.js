const loginService = require('../useCases/login/loginService');
const schema = require('../schemas/login');

const { unauthorized } = require('../utils/httpStatus');

const authLogin = async (request, _response, next) => {
  const { email, password } = request.body;
  const { error } = schema.validate({ email, password });

  if (error) return next({ status: unauthorized, message: 'All fields must be filled' });

  const { err, token } = await loginService({ email, password });

  if (err) return next({ status: unauthorized, message: 'Incorrect username or password' });

  request.token = token;

  next();
};

module.exports = authLogin;
