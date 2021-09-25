const userService = require('../services/userService');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const { token, message, code } = await userService.authorizeLogin(email, password);
 
  if (message) return res.status(code).json(message);

  return res.status(200).json({ token });
};