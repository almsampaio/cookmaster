const invalidEntries = { message: 'Invalid entries. Try again.' };
const userModel = require('../models/userModels');

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    if (!email || email === '') {
       return invalidEntries;
    }
    if (!re.test(String(email).toLowerCase())) {
        return invalidEntries;
   }

   return email;
}
function validatePassword(password) {
    if (!password || password === '') {
        return invalidEntries;
        }
    if (password.length < 6) {
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

module.exports = {
    validateEmail,
    validatePassword,
    register,
    }; 