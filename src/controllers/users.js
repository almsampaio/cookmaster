const { userServices } = require('../services');
const schema = require('../schema');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const registerUser = await userServices.create(name, email, password);
  return res.status(schema.status.created).json(registerUser);
};

const login = async (req, res) => {
  const { email } = req.body;
  const token = await userServices.login(email);
  return res.status(schema.status.ok).json({ token });
};

module.exports = { create, login };
