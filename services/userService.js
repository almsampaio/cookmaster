const userModel = require('../models/userModel');
const { gettingToken } = require('./tokenAuthorization');

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
    if (validatedFields === false) { return { status: 400, message: invalidEntries }; }
    const emailFound = await findEmail(email);
    if (emailFound) { return { status: 409, message: emailRegistered }; }
    const result = await userModel.registerUser(name, email, password);
    if (result.message) { return { status: result.status, message: result.message }; }
    return result;
};

const checkLogin = async (email, password) => {
    if (!email || !password) {
        return { status: 401, message: allFieldsFilled };
    }
    const emailChecked = await checkEmail(email);
    const result = await userModel.checkLogin(email, password);
    const { _id, role } = result;
  const payload = {
    _id,
    email,
    role,
  };

  const token = gettingToken(payload);
  if (result) return token;
    if (emailChecked) {
        return { status: 401, message: incorrectFieldData };
    }
};

module.exports = {
    registerUser,
    checkLogin,
};
