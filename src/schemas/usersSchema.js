const usersModel = require('../models/usersModel');

const errors = {
    nameEmailPasswordWrong: 'Invalid entries. Try again.',
    emailExist: 'Email already registered',
};

const validateName = (name) => {
    if (!name) {
        return { message: errors.nameEmailPasswordWrong };
    }
};

const validateEmail = (email) => {
    if (!email || !email.includes('@') || !email.includes('.com')) {
        return { message: errors.nameEmailPasswordWrong };
    }
};

const validateIfExistEmail = async (email) => {
    const existingEmail = await usersModel.getAll();
    const userEmail = existingEmail.find((user) => user.email === email);

    if (userEmail) { return { message: errors.emailExist }; }
};

const validatePassword = (password) => {
    if (!password) {
        return { message: errors.nameEmailPasswordWrong };
    }
};

module.exports = {
    validateName,
    validateEmail,
    validatePassword,
    validateIfExistEmail,
};
