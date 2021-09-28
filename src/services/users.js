const usersModel = require('../models/users');

const create = async (name, email, password) => {
    const users = await usersModel.create(name, email, password);
    return users;
};

module.exports = { create };