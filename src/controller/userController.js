const userService = require('../services/userService');
const STATUS = require('../util/myConstants');

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const createdUser = await userService.createUser(name, email, password);
    return res.status(STATUS.STATUS_201_CREATED).json({ user: createdUser });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createUser,
};
