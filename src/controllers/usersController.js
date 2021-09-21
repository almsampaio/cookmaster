const usersServices = require('../services/usersService');

const userRegistration = async (req, res, _next) => {
  const user = req.body;
  const { status, result } = await usersServices.register(user);
  return res.status(status).json(result);
};

module.exports = {
  userRegistration,
};
