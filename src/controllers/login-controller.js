const loginService = require('../services/login-service');

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginData = await loginService.validatingLogin(email, password);

    if (loginData.message) return res.status(loginData.status).json({ message: loginData.message });
    res.status(200).json(loginData.token);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { loginController };
