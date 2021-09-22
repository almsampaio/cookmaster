const usersServices = require('../services/usersServices');

const create = async (req, res) => {
  const createuser = await usersServices.create(req.body);
  return res.status(createuser.status).json(createuser.message);
};

const login = async (req, res) => {
  const { email } = req.body;
  const token = await usersServices.generateToken(email);
  return res.status(200).json({ token });
};

module.exports = { create, login };
