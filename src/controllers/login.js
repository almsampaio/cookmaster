const login = require('../services/login');

const ok = 200;

const create = async (req, res) => {
  const { email, password } = req.body;
  const result = await login.create({ email, password });
  return res.status(ok).json(result);
};

module.exports = {
  create,
};