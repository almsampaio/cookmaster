// regex para validação de email https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
const userModel = require('../models/userModel');

const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const isEmailCreated = async (name, email, password) => {
    const isEmailUsed = await userModel.getByUserEmail(email);
    if (isEmailUsed) {
        return { message: 'Email already registered', status: 409 };
    }
    return userModel.createUser(name, email, password);
};

const create = async (name, email, password) => {
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

    return isEmailCreated(name, email, password);
};

module.exports = {
    create,
};