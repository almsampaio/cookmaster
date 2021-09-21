// SERVICE

const createUserModel = require('../models/users/createUserModel');

const createUserService = async (name, email, password) => {

    if (!name || !email || !password) {
        return {
            status: 400,
            message: 'Invalid entries. Try again.',
        };
    }

    const user = await createUserModel(name, email, password);
    return { status: 200, message: user };    
};

module.exports = createUserService;