const {
  addUser,
} = require('../services/Users');

const createUSer = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await addUser(name, email, password);

  if (user.status) return res.status(user.status).json({ message: user.message });

  res.status(201).json({ user });
};

module.exports = {
  createUSer,
};
