const {
  createLogin,
} = require('../services/Users');

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await createLogin(email, password);
  return res.status(result.status).json(result.token);
};

module.exports = {
  login,
};
