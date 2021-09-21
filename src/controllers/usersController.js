const services = require('../services/usersServices');

const create = async (req, res) => {
  await services.create(req.body);
  res.status(201).json({ message: 'foi' });
};

module.exports = {
  create,
};
