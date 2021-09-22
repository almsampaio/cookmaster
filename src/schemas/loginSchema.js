const userModel = require('../models/usersModel');

const errors = {
    emailPasswordDoesntExist: 'All fields must be filled',
    emailPasswordInvalid: 'Incorrect username or password',
};

// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

const regExEmail = (email) => {
    const checkEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

    if (!checkEmail.test(email)) {
        return { message: errors.emailPasswordInvalid };
    }   
};

const validateAll = async (email, password) => {
    if (!email || !password) { return { message: errors.emailPasswordDoesntExist }; }

    regExEmail(email);

    const user = await userModel.getLoginByEmail(email);
    if (!user || user.password !== password) { return { message: errors.emailPasswordInvalid }; }
};

module.exports = {
    validateAll,
};