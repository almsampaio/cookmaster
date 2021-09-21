const services = require('../services/usersServices');
const httpStatus = require('../util/statusHttp');

const getAll = async (_req, res) => {
  const result = await services.getAll();
  res.status(httpStatus.OK).json(result);
};

const create = async (req, res) => {
  const result = await services.create(req.body);
  if (result.msg) return res.status(result.status).json(result.msg);
  res.status(httpStatus.CREATED).json(result);
};

const findUser = async (req, res) => {
  const result = await services.findUser(req.body);
  if (result.msg) return res.status(result.status).json(result.msg);
  res.status(httpStatus.OK).json(result);
};

module.exports = {
  getAll,
  create,
  findUser,
};
