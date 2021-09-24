const Users = require('../services/users');

const create = async (req, res) => {
  const { status, data, err } = await Users.create(req.body);
  if (err) return res.status(status).json(err);

  res.status(status).json(data);
};

const generetorToken = async (req, res) => {
  const { status, token, err } = await Users.generetorToken(req.body);
  if (err) return res.status(status).json(err);

  res.status(status).json({ token });
};

const createAdmin = async (req, res) => {
  const { status, data, err } = await Users.createAdmin(req.body);
  if (err) return res.status(status).json(err);

  res.status(status).json(data);
};

module.exports = {
  create,
  generetorToken,
  createAdmin,
};