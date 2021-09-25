const loginService = require('../services/loginService');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    
    const token = await loginService.login(email, password);

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
};
