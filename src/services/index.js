const doesEmailExists = require('./doesEmailExists');
const getToken = require('./getToken');
const getOneUser = require('./getOneUser');
const insertOneUser = require('./insertOneUser');
const validateEmail = require('./validateEmail');

module.exports = {
    validateEmail,
    doesEmailExists,
    insertOneUser,
    getToken,
    getOneUser,
};
