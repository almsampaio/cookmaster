const { userRegisterService } = require('./usersService');

async function userRegisterController(req, res) {
  const { name, email, password } = req.body;
  const userToRegister = { name, email, password };
  const tryRegister = await userRegisterService(userToRegister);
  if (tryRegister.statusCode) {
    const { statusCode, message } = tryRegister;
    return res.status(statusCode).json({ message });
  }
  return res.status(201).json(tryRegister);
}

module.exports = {
  userRegisterController,
};
