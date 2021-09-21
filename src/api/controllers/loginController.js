const loginService = require('../services/loginService');

const signIn = async (req, res) => {
  const user = req.body;

  const result = await loginService.signIn(user);

  if (result.error) return res.status(result.error.code).json({ message: result.error.message });

  return res.status(200).json(result);
};

module.exports = { signIn };