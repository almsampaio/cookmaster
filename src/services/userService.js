// regex para validação de email https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const SECRET = 'ajnakdghadkuhdkagFNDAKJGNEAKUGF38AQNIJNW9h87HYR6DWVDYGb9YE2jdangkabarkhareajknf';

const isEmailCreated = async (name, email, password, err) => {
    const isEmailUsed = await userModel.getByUserEmail(email);
    if (isEmailUsed) {
        return { ...err };
    }
    return userModel.createUser(name, email, password);
};

const userCreateService = async (name, email, password) => {
    if (!name || !email || !password) {
        return {
            message: 'Invalid entries. Try again.',
            status: 400,
        };
    }
    if (!emailRegex.test(email)) {
        return {
            message: 'Invalid entries. Try again.',
            status: 400,
        };
    }

    return isEmailCreated(name,
        email, password, { message: 'Email already registered', status: 409 });
};

const userLoginService = async (req) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return {
            message: 'All fields must be filled',
            status: 401,
        };
    }
    const isEmailUsed = await userModel.getByUserEmail(email);
    if (!isEmailUsed || isEmailUsed.password !== password) {
        return { message: 'Incorrect username or password', status: 401 };
    }

    return jwt.sign({ id: isEmailUsed.id, email: isEmailUsed.email }, SECRET);
};

module.exports = {
    userCreateService,
    userLoginService,
};