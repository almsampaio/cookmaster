const { StatusCodes: { CREATED, OK } } = require('http-status-codes');
const userService = require('../services/userService');

const createNewUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
      const result = await userService.createNewUser({ name, email, password });
      res.status(CREATED).json({
        user: {
          name,
          email,
          role: 'user',
          _id: result.insertedId,
        },
      });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
try {
  const token = await userService.login(req.body);
  res.status(OK).json(token);
} catch (e) {
  next(e);
}
};

module.exports = {
  createNewUser,
  login,
};