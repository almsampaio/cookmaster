const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const SECRET = 'minhasupersenha';

const BADREQUEST = 400;
const CREATED = 201;
const UNAUTHORIZED = 401;
const OK = 200;

const validateInfosCreateUsers = async (email, password, name) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const validateEmail = regex.test(String(email));
    if (!name || !password || !email || !validateEmail) {
        return { obj: { message: 'Invalid entries. Try again.' }, status: BADREQUEST };
    }
    const user = await userModel.createUsers(email, password, name);
     return { obj: { user }, status: CREATED };
};

const validateUserAndSendToken = async (email, password) => {
    if (!email || !password) {
     return { obj: { message: 'All fields must be filled' },
     status: UNAUTHORIZED }; 
}
    const user = await userModel.getUserByEmailAndPassword(email, password);
    if (!user) return { obj: { message: 'Incorrect username or password' }, status: UNAUTHORIZED };
    const { password: _, ...payload } = user;
    const token = jwt.sign(payload, SECRET);
    return { obj: { token }, status: OK };
};

module.exports = {
    validateInfosCreateUsers,
    validateUserAndSendToken,
};
