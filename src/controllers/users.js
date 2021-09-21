const Users = require('../services/users');

const create = async (req, res) => {
  const { status, data, err } = await Users.create(req.body);
  if (err) return res.status(status).json(err);
  res.status(status).json(data);
};

const tokenGen = async (req, res) => {
  const { status, token, err } = await Users.tokenGen(req.body);
  if (err) return res.status(status).json(err);
  res.status(status).json({ token });
};

module.exports = {
  create,
  tokenGen,
};