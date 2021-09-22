const Joi = require('joi');
const jwt = require('jsonwebtoken');
const userModels = require('../models/user');

const registerJoi = Joi.object({
  name: Joi.string().not().empty().required(),
  email: Joi.string().not().empty().email()
  .required(),
  password: Joi.string().not().empty().required(),
});

const registerUser = async (req, res, next) => {
  const { error } = registerJoi.validate(req.body);

  if (error) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const { name, email, password } = req.body;
  const result = await userModels.registerUser(name, email, password);
  if (result.error) return next(result.error);

  res.status(201).json(result);
};

const JWT_SECRET = 'test123';
const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const loginJoi = Joi.object({
  email: Joi.string().not().empty().required(),
  password: Joi.string().not().empty().required(),
});

const loginJoiEmail = Joi.string().not().empty().email()
.required();

const login = async (req, res, _next) => {
  const loginErr = loginJoi.validate(req.body);
  const emailErr = loginJoiEmail.validate(req.body.email);

  if (loginErr.error) return res.status(401).json({ message: 'All fields must be filled' });
  if (emailErr.error) return res.status(401).json({ message: 'Incorrect username or password' });

  const { email, password } = req.body;
  const result = await userModels.login(email, password);
  if (!result) return res.status(401).json({ message: 'Incorrect username or password' });
  const { _id } = result;
  const payload = {
    id: _id,
    email: result.email,
    role: result.role,
  };
  const token = jwt.sign({ data: payload }, JWT_SECRET, JWT_CONFIG);
  res.status(200).json({ token, result });
};

module.exports = {
  registerUser,
  login,
};
