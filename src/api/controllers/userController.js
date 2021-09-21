const userService = require('../services/userService'); 

const signUp = async (req, res) => {
  const user = req.body;

  const result = await userService.signUp(user);

  if (result.error) return res.status(result.error.code).json({ message: result.error.message });

  return res.status(201).json(result);
};

module.exports = { signUp };