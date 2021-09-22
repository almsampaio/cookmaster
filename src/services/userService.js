// SERVICE

const userModel = require('../models/users/userModel');

const createUserService = async (name, email, password) => {
    if (!name || !email || !password) {
        return {
            status: 400,
            message: 'Invalid entries. Try again.',
        };
    }

    const findUser = await userModel.findUserModel(email);

    if (findUser !== null) {
        return {
            status: 409,
            message: 'Email already registered',
        };
    }
    
    const user = await userModel.createUserModel(name, email, password);
    return { status: 201, message: user };    
};

module.exports = { createUserService };