const usersService = require('../services/usersService');

async function register(req, res, next) {
  try {
    const user = req.body;
    user.role = 'user';

    const id = await usersService.register(user);

    delete user.password;

    res.status(201).json({
      user: {
        ...user,
        ...id,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
};
