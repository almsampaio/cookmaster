const usersServices = require('../services/usersServices');

const create = async (req, res) => {
   const createuser = await usersServices.create(req.body);
  return res.status(createuser.status).json(createuser.message);
};

module.exports = { create };
