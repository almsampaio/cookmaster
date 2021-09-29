const usersServices = require('../../services/usersServices');

const role = 'user';

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const data = await usersServices.create(name, email, password, role);
    const { _id } = data;
    return res.status(201).json({ user: { name, email, role, _id } });
};

module.exports = { createUser };