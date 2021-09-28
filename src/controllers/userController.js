const userService = require('../services/userService');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const { err, newUser, status } = await userService.create(name, email, password);
  if (err) {
  return res.status(err.code)
    .json({ message: err.message }); 
  }
  res.status(status).json({ user: newUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { err, token, userPayload } = await userService.login(email, password);
  if (err) {
    return res.status(err.code)
      .json({ message: err.message }); 
    }
  res.status(200).json({ token, userPayload });
};

module.exports = {
  create,
  login,
};
