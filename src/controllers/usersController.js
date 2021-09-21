const services = require('../services/usersServices');

const create = async (req, res) => {
  const result = await services.create(req.body);
  res.status(201).json(result);
};

module.exports = {
  create,
};
