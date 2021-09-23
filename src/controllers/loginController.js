const loginService = require('../services/loginService');
const errorDefault = require('../utils/errorDefault');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    
    const token = await loginService.login(email, password);

    res.status(200).json({ token });
  } catch (err) {
    const error = errorDefault(err);
    next(error);
  }
}

module.exports = {
  login,
};
