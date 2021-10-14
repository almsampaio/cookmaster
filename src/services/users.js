const modelsUsers = require('../models/users');
const util = require('../util/users');

const create = async (name, email, password) => {
   console.log(email);
    if (!name || !password || !util.validateEmail(email)) {
      return { status: 400, data: { message: 'Invalid entries. Try again.' } };
    }

    const newEmail = await modelsUsers.getEmail(email);
    if (newEmail) return { status: 409, data: { message: 'Email already registered' } };
    const createUser = await modelsUsers.create(
      { name, email, password },
    );
    return { status: 201, data: { user: createUser } };
};

module.exports = {
    create,
};
