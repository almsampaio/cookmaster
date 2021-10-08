const modelsUsers = require('../models/users');
const util = require('../util/users');

const create = async (name, email, password) => {
    if (!name || !password || !util.validateEmail(email)) {
      return { status: 400, data: { message: 'Invalid entries. Try again.' } };
    }
    const newEmail = await modelsUsers.getEmail(email);
    if (newEmail) return { status: 409, data: { message: 'Email already registered' } };
        const createdUser = await modelsUsers.create({ name, email, password });
    return { status: 201, data: { user: createdUser } };
};
module.exports = {
    create,
};
