const services = require('../services/usersServices');
const httpStatus = require('../util/statusHttp');

const create = async (req, res) => {
  const result = await services.create(req.body);
  if (result.msg) return res.status(result.status).json(result.msg);
  res.status(httpStatus.CREATED).json(result);
};

module.exports = {
  create,
};
