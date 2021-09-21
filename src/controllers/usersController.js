const usersService = require('../services/usersService');

function errorDefault(err) {
  return {
    status: err.status || 500,
    code: err.code || 'server_error',
    message: err.message,
  };
}

async function register(req, res, next) {
  try {
    const user = req.body;
    user.role = 'user';

    const newUserId = await usersService.register(user);

    delete user.password;

    res.status(201).json({
      user: {
        ...user,
        _id: newUserId,
      },
    });
  } catch (err) {
    const error = errorDefault(err);
    next(error);
  }
}

module.exports = {
  register,
};
