const invalidEntries = { message: 'Invalid entries. Try again.' };
const SECRET = 'meusupersegredo';
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModels');

function validateEmail(email) {
    if (!email || email === '') {
        return invalidEntries;
        }
    const re = /\S+@\S+\.\S+/;

    if (!re.test(String(email).toLowerCase())) {
        return invalidEntries;
   }

   return email;
}
function validatePassword(password) {
    if (!password || password === '') {
        return invalidEntries;
        }
    return password;
}

const register = async (name, email, password) => {
    if (!name) return invalidEntries;
    const uniqueEmail = await userModel.findByEmail(email);
  
    if (uniqueEmail) return { message: 'Email already registered' };
    const vpassword = validatePassword(password);
    const vemail = validateEmail(email);
    if (vpassword === invalidEntries || vemail === invalidEntries) return invalidEntries;
  
    const createdUser = await userModel.register(name, email, password);
  
    return createdUser;
  };

const findByCredentials = async (email, password) => {
    if (!email || !password) {
        return (
     { status: 401, message: 'All fields must be filled' }
       ); 
                            }

    const userSearch = await userModel.findByEmail(email);

    if (!userSearch || userSearch.password !== password) {
        return (
        { status: 401, message: 'Incorrect username or password' }
); 
}

    const { password: _, ...userPayload } = userSearch;

    const token = jwt.sign(userPayload, SECRET);
        return ({ token });
    };

module.exports = {
    validateEmail,
    validatePassword,
    register,
    findByCredentials,
    }; 