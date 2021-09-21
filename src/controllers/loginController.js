const { loginService } = require('../services');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  loginService
  .login({ email, password })
  .then(({ code, token }) => res.status(code).json({ token }))
  .catch(({ code, message }) => res.status(code).json({ message }));
};
