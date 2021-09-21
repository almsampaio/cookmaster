const { userRegisterService } = require('./usersService');

async function userRegisterController(_req, res) {
  const teste = await userRegisterService();
  if (teste === true) return res.status(200).json({ message: true });
  return res.status(200).json({ message: false });
}

module.exports = {
  userRegisterController,
};
