const findByEmailModel = require('./findByEmailModel');

const createUserService = async (email) => {
    const findedUser = await findByEmailModel(email);
    return findedUser;
};

module.exports = createUserService;
