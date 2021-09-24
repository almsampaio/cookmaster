const loginService = require('../services/loginService');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginService.loginUser(email, password);
    return res.status(result.status).json({ message: result.message });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = {
  loginUser,
};
