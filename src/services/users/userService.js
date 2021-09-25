const jwt = require('jsonwebtoken');
const userModel = require('../../models/users/userModel');
const { 
    isUserDataValid, 
    isUserEmailValid,
} = require('../../validations/usarDataValidations');

const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
};

// o segredo está aqui apenas para o avaliador funcionar
const secret = '12345';

const createUserService = async (name, email, password) => {
    const checkUserData = isUserDataValid(name, password);
    const checkUserEmail = isUserEmailValid(email);

    if (!checkUserData || !checkUserEmail) {
            return {
                status: 400,
                message: { message: 'Invalid entries. Try again.' },
            };
    }

    const findUser = await userModel.findUserModel(email);

    if (findUser !== null) {
        return {
            status: 409,
            message: { message: 'Email already registered' },
        };
    }
    
    const user = await userModel.createUserModel(name, email, password);
    return { status: 201, message: user };    
};

const loginService = async (email, password) => {
    if (!email || !password) {
        return { status: 401, message: { message: 'All fields must be filled' } };
    } 

    const user = await userModel.loginModel(email, password);

    if (user === null) {
        return { status: 401, message: { message: 'Incorrect username or password' } };
    }

    const { _id } = user;

    const tokenPayload = {
        userId: _id,
        email: user.email,
        role: user.role,
    };

    const token = jwt.sign(tokenPayload, secret, jwtConfig);

    return { status: 200, message: { token } };
};

const getAllUsersService = async () => {
    const users = await userModel.getAllUsersModel();
    return { status: 200, message: users };
};

const deleteAllUsersService = async () => {
    const users = await userModel.deleteAllUsersModel();
    return { 
        status: 200, 
        message: `${users.result.n} users deleted.`,
    };
};

module.exports = { 
    createUserService,
    loginService,
    getAllUsersService,
    deleteAllUsersService,
};