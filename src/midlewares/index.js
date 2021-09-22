const validateAuthetication = require('./validateAuthentication');
const validateLoginFields = require('./validateLoginFields');
const validateRecipe = require('./validateRecipe');
const validateUser = require('./validateUser');

module.exports = {
    validateUser,
    validateLoginFields,
    validateRecipe,
    validateAuthetication,
};