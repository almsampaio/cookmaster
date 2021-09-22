const userModel = require('../models/usersModel');

const BADREQUEST = 400;
const CREATED = 201;

const validateInfosUsers = async (email, password, name) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const validateEmail = regex.test(String(email));
    if (!name || !password || !email || !validateEmail) {
        return { obj: { message: 'Invalid entries. Try again.' }, status: BADREQUEST };
    }
    const user = await userModel.createUsers(email, password, name);
     return { obj: { user }, status: CREATED };
};

module.exports = {
    validateInfosUsers,
};
