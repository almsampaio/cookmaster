const services = require('../services');

// REQUISITO 1
const createUsers = async (req, res) => {
  const newUser = req.body;
  const { status, addNewUser } = await services.usersService.createUsers(newUser);
  res.status(status).json({ user: addNewUser });
};

module.exports = { 
  createUsers,
};
