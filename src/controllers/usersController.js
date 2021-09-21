const services = require('../services/usersServices');
const httpStatus = require('../util/statusHttp');

const create = async (req, res) => {
  const result = await services.create(req.body);
  if (result.message) return res.status(httpStatus.BAD_REQUEST).json(result);
  res.status(201).json(result);
};

module.exports = {
  create,
};
