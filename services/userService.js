const userModel = require('../models/userModel');

// const jwt = require('jsonwebtoken');

// const secret = 'tokensecreto';

// const jwtConfig = {
//     expiresIn: '7d',
//     algorithm: 'HS256',
//   };

//   const token = jwt.sign({ user }, secret, jwtConfig);

//   res.status(200).json({ token });

const {
    emailRegistered,
invalidEntries,
allFieldsFilled,
incorrectFieldData, /*
wrongJWT,
recipeNotFound,
missingToken */ } = require('../utils/errorMessages');

const checkEmail = async (email) => {
    if (!email) return false;
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const validEmail = regex.test(String(email).toLowerCase());
    return validEmail;
};

const findEmail = async (email) => {
    const result = await userModel.findEmail(email);
    return result;
};

const noRequiredFields = (name, validEmail, password) => {
    if (!name || !validEmail || !password) {
        return false;
    }
    return true;
};

const registerUser = async (user) => {
    const { name, email, password } = user;
    const validEmail = await checkEmail(email);
    const validatedFields = await noRequiredFields(name, validEmail, password);
    if (!validatedFields) { return { status: 400, message: invalidEntries }; }
    const emailFound = await findEmail(email);
    if (emailFound) { return { status: 409, message: emailRegistered }; }
    const result = await userModel.registerUser(name, email, password);
    // console.log('RESULTADO DO CADASTRO - - - - - ', result);
    if (result.message) { return { status: result.status, message: result.message }; }
    return result;
};

const checkLogin = async (email, password) => {
    if (!email || !password) {
        return { status: 401, message: allFieldsFilled };
    }
    // const validEmail = checkEmail(email);
    if (checkEmail(email)) {
        return { status: 401, message: incorrectFieldData };
    }
    const result = await userModel.checkLogin(email, password);
    return result;
};

module.exports = {
    registerUser,
    checkLogin,
};
