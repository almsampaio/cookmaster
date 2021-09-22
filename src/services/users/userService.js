// SERVICE

const jwt = require('jsonwebtoken');
const userModel = require('../../models/users/userModel');

const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
};

const secret = '12345';

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

const loginService = async (email, password) => {
    if (!email || !password) return { status: 401, message: 'All fields must be filled' };

    const user = await userModel.loginModel(email, password);

    if (user === null) {
        return { status: 401, message: 'Incorrect username or password' };
    }

    const { _id } = user;

    const tokenPayload = {
        id: _id,
        email: user.email,
        role: user.role,
    };

    const token = jwt.sign(tokenPayload, secret, jwtConfig);

    return { status: 200, message: token };
};

module.exports = { 
    createUserService,
    loginService,
};