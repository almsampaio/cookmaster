const loginService = require('../services/loginService');
const STATUS = require('../util/myConstants');

const login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = await loginService.login(email);
    return res.status(STATUS.STATUS_200_OK).json({ token });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  login,
};
