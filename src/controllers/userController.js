const userService = require('../services/userService');

async function addUser(req, res) {
  const { name, email, password } = req.body;
  res.send({ name, email, password });
}

module.exports = {
  addUser,
};
