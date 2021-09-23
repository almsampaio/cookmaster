const loginSchema = require('../schemas/loginSchema');

const logIn = async (email, password) => {
    const validate = await loginSchema.validateAll(email, password);
    
    if (validate) return validate;  

    return { email, password };
};

module.exports = {
    logIn,
};
