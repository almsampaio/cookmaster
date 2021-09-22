const loginService = require('../services/login');

module.exports = {
  async login(req, res) {
    try {
      const token = await loginService.login(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  },
};
