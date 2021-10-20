// const UserModel = require('../models/Users');
const UserService = require('../services/Users');

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const { status, json } = await UserService.create({ name, email, password });

  return res.status(status).json(json);
};

module.exports = {
  create,
};
