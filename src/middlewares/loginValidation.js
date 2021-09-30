const usermodels = require('../models/userModel');

const emailRequired = async (req, res, next) => {
    const { email } = req.body;

    if (!email || email === '') {
        return res.status(401).json({ message: 'All fields must be filled' });
    }
    next();
};

const passwordRequired = async (request, response, next) => {
    const { password } = request.body;

    if (!password || password === '') {
        return response.status(401).json({ message: 'All fields must be filled' });
    }

    next();
};

const emailValid = async (request, response, next) => {
    const { email } = request.body;

    const pattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
    const comparePattern = email.match(pattern);
    if (!comparePattern) {
        return response.status(401).json({ message: 'Incorrect username or password' });
    }

    next();
};

const passwordValid = async (request, response, next) => {
    const { password } = request.body;

    const searchByPassword = await usermodels.findPassword(password);
    if (!searchByPassword) {
        return response.status(401).json({ message: 'Incorrect username or password' });
}

next();
};

module.exports = { 
    emailRequired, 
    passwordRequired, 
    emailValid, 
    passwordValid }; 
