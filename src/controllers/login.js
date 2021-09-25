const loginService = require('../services/loginService');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginService.loginUser(email, password);
    if (result.status === 200) return res.status(result.status).json({ token: result.message });
    return res.status(result.status).json({ message: result.message });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = {
  loginUser,
};
