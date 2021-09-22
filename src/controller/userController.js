// const { ObjectId } = require('mongodb');
const userService = require('../service/userService');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const { err, data } = await userService.create(name, email, password);

  if (err) return res.status(409).json(err);

  const { _id } = data;

  return res.status(201)
    .json({ user: { name: data.name, email: data.email, role: data.role, _id } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { err, token } = await userService.login(email, password);

  if (err) return res.status(401).json(err);

  return res.status(200)
    .json({ token });
};

module.exports = {
  create,
  login,
};
