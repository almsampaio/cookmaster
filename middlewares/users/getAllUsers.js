const usersServices = require('../../services/usersServices');

const getAllUsers = async (_req, res) => {
  const data = await usersServices.getAll();
  return res.status(200).json({ users: data });
};

module.exports = { getAllUsers };