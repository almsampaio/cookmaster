const model = require('../models/users');

const createUser = async (name, email, password) => {
    const existingEmail = await model.findByEmail(email);
    if (existingEmail) {
      return {
        err: { message: 'Email already registered' },
      };
    }   
    return model.createUser(name, email, password);
};

module.exports = { createUser };