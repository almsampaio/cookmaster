const statusCode = require('http-status-codes');
const userService = require('../services/userService');

const create = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await userService.create({ name, email, password, role });
  const { id } = user;

  if (user.message === 'Invalid entries. Try again.') {
    return res.status(statusCode.BAD_REQUEST).json(
      { message: user.message },
    );
  }

  if (user.message === 'Email already registered') {
    return res.status(statusCode.CONFLICT).json(
      { message: user.message },
    );
  }

  return res.status(statusCode.CREATED).json({ user: { name, email, role: 'user', _id: id } });
};

module.exports = { create };