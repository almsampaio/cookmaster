const service = require('../services/users');

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const response = await service.createUser({ name, email, password });

  if (response.error) return next(response);

  return res.status(201).json(response);
};

module.exports = {
  createUser,
};
