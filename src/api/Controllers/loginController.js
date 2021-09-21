const loginServices = require('../Services/loginServices');

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const { code, message } = await loginServices.userLogin(email, password);
  console.log(code);

  return res.status(code).json({ message });
};
module.exports = {
  userLogin,
};