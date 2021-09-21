const service = require('../services/users');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const response = await service.findUserByCredentials({ email, password });

  if (response.error) return next(response);

  res.status(200).json({ token: response });
};

module.exports = {
  login,
};
