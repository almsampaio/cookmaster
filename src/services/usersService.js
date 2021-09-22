const usersModel = require('../models/usersModel');
const usersSchema = require('../schemas/usersSchema');

const create = async (name, email, password) => {
    const userValidateName = usersSchema.validateName(name);
    const userValidateEmail = usersSchema.validateEmail(email);
    const userValidateIfExistEmail = await usersSchema.validateIfExistEmail(email);
    const userValidatePassword = usersSchema.validatePassword(password);

    if (userValidateName) { return userValidateName; }
    if (userValidateEmail) { return userValidateEmail; }
    if (userValidatePassword) { return userValidatePassword; }
    if (userValidateIfExistEmail) { return userValidateIfExistEmail; }

    const createdUser = await usersModel.create(name, email, password);
    
    return createdUser;
};

module.exports = {
    create,
};