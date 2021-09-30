const userService = require('../services/userService');

exports.create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await userService.create({ name, email, password });

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.createAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await userService.create({ name, email, password, admin: true });

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};
