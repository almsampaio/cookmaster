const serviceLogin = require('../service/loginService');

const userLogin = async (req, res, next) => {
  try {
    const user = req.body;
    const token = await serviceLogin.validateLogin(user);
    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = { userLogin };