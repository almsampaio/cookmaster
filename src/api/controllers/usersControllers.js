const services = require('../services');

// REQUISITO 1
const createUsers = async (req, res) => {
  const newUser = req.body;
  const { status, err, addNewUser } = await services.usersService.createUsers(newUser);
  if (err) return res.status(status).json({ message: err.message });
  res.status(status).json({ user: addNewUser });
};

module.exports = { 
  createUsers,
};
