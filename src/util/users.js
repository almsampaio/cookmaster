/* const users = require('../models/users');

const userValidate = async (req,res, next) => {
    const {email,name, password} = req.body;
    
    const validateEmail = users.getEmail();

 if (!regex.test(email) || !email || !name || !password) {
     return res.status(400).json({ message: 'Invalid entries. Try again.'});
    }
 if (validateEmail === email) {
     return res.status(409).json({ message: 'Email already registered' });
    }
 next();
}; */

const validateEmail = async (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

module.exports = {
    validateEmail,
};
