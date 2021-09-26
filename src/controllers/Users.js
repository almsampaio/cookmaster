const {
  addUser,
} = require('../services/Users');

const createUSer = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await addUser(name, email, password);

  res.status(201).json(result);
};

module.exports = {
  createUSer,
};
