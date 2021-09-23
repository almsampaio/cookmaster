const jwt = require('jsonwebtoken');
const Joi = require('joi');

const User = require('../models/usersModel');

const secret = 'secrettoken';
const ERROR_MESSAGE = 'All fields must be filled';

const validateBody = (body) => 
  Joi.object({
    email: Joi.string().email().not().empty()
      .required(),
    password: Joi.string().not().empty()
      .required(),
  }).validate(body);

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const { error } = validateBody(req.body);

  if (error) {
    return res.status(401).json({ message: ERROR_MESSAGE });
  }

  const user = await User.findByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return res.status(200).json({ token });
};
