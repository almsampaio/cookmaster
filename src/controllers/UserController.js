const jwt = require('jsonwebtoken');

const UserService = require('../services/Users');

const secret = 'seusecretdetoken';

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user' in req ? req.user.role : undefined;

  const { status, json } = await UserService.create({ name, email, password, role });

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
