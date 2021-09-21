const Joi = require('joi');
const jwt = require('jsonwebtoken');

const loginModel = require('../models/login');

const UNFILLED_FIELD = { message: 'All fields must be filled', status: 401 };
const INVALID_DATA = { message: 'Incorrect username or password', status: 401 };

const validateLogin = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string().required(),
});

const generateToken = ({ _id: id, email, role }) => {
  const JwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const secret = 'senhasecreta';

  const token = jwt.sign({ data: { id, email, role } }, secret, JwtConfig);
    
  return token;
};

const login = async (email, password) => {
  const { value, error } = validateLogin.validate({ email, password });

  if (error) return { error: UNFILLED_FIELD };

  const result = await loginModel.login(value);

  if (!result) return { error: INVALID_DATA };

  const token = generateToken(result); 

  return { result: { token } };
};

module.exports = {
  login,
};
