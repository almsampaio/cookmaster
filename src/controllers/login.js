const jwt = require('jsonwebtoken');
const service = require('../services');

const JWT_SECRET = '123';
const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

module.exports = async (req, res) => {
  const { status, user: { _id: id, email, role } } = await service.login(req.body);

  const payload = { id, email, role };
  const token = jwt.sign({ data: payload }, JWT_SECRET, jwtConfig);

  res.status(status).json({ token });
};