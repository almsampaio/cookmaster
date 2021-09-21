const Joi = require('joi');
const jwt = require('jsonwebtoken');
// const userServices = require('../services/user');
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

const JWT_SECRET = 'verysecrettoken';
const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const loginJoi = Joi.object({
  email: Joi.string().not().empty().email()
  .required(),
  password: Joi.string().not().empty().required(),
});

const login = async (req, res, _next) => {
  const { error } = loginJoi.validate(req.body);
  if (error) return res.status(401).json({ message: 'All fields must be filled' });

  const { email, password } = req.body;
  const result = await userModels.login(email, password);
  if (!result) return res.status(401).json({ message: 'Incorrect username or password' });

  const token = jwt.sign(result, JWT_SECRET, JWT_CONFIG);
  res.status(200).json(token);
};

module.exports = {
  registerUser,
  login,
};
