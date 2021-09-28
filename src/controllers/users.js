const userService = require('../services/users');

async function create(req, res) {
  const { name, email, password } = req.body;
  const user = await userService.create(name, email, password);
  return res.status(201).json(user);
}

module.exports = {
  create,
};
