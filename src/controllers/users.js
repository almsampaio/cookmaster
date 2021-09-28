const usersServices = require('../services/users');

const create = async (req, res) => {
const { name, email, password } = req.body;
const user = await usersServices.create(name, email, password);
return res.status(201).json(user);
};

module.exports = { create };