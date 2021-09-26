const {
  addUser,
} = require('../services/Users');

const createUSer = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await addUser(name, email, password);

  res.status(201).json({ user });
};

module.exports = {
  createUSer,
};
