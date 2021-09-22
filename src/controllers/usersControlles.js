// const rescue = require('express-rescue');
const servicesUsers = require('../services/usersServices');

const created = async (req, res) => {
  const { name, email, password } = req.body;

  const { status, data } = await servicesUsers.created(name, email, password);
  
  if (data) return res.status(status).json(data);
  
  res.status(status).json(data);
};

module.exports = {
  created,
};