const services = require('../services');

// REQUISITO 2
const login = async (req, res) => {
  const { status, token, err } = await services.loginService.login(req.body);
  if (err) return res.status(status).json(err);
  res.status(status).json({ token });
};

module.exports = { 
  login,
};
