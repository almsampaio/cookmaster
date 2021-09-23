const userService = require('../services/userService');

const create = async (req, res) => {
  const { body: user } = req;

  const { createdUser, code, message } = await userService.create(user);

  if (message) return res.status(code).json({
    message
  });

  return res.status(201).json({ user: createdUser });
};

module.exports = {
  create,
};
