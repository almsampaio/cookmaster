const service = require('../services');

module.exports = async (req, res) => {
  const login = await service.login(req.body);
  console.log(login);
  res.send(req.body);
};