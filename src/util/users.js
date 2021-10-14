const jwt = require('jsonwebtoken');

const validateEmail = (email) => {
    const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    if (regex.test(email)) return true;
    return false;
};

const SECRET = 'meu_segredo';

const createToken = (user) => {
    const token = jwt.sign(user, SECRET);
    return token;
};

const checkData = (body) => {
    const { email, password } = body;
    if (!email || !password) return { status: 401, data: { message: 'All fields must be filled' } };
    return false;
};

module.exports = {
    validateEmail,
    createToken,
    checkData,
};
