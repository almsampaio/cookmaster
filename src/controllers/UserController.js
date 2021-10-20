const jwt = require('jsonwebtoken');

// const UserModel = require('../models/Users');
const UserService = require('../services/Users');

const secret = 'seusecretdetoken';

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const { status, json } = await UserService.create({ name, email, password });

  return res.status(status).json(json);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const { status, json } = await UserService.login({ email, password });

  if (status === 200) {
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: json }, secret, jwtConfig);
    return res.status(status).json({ token });
  }

  return res.status(status).json(json);
};

module.exports = {
  create,
  login,
};
