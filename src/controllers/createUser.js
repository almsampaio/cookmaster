const service = require('../services');

const createUser = async (req, res) => {
  const user = await service.createUser(req.body);
  console.log(user);
  return res.send(user);
};

module.exports = {
  createUser,
}