const servicesUsers = require('../services/usersServices');

const loginUsers = async (req, res) => {
  const { email, password } = req.body;

  const { status, data } = await servicesUsers.createdToken(email, password);

  return res.status(status).json(data);
};

module.exports = {
  loginUsers,
};