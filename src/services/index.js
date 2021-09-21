const doesEmailExists = require('./doesEmailExists');
const getToken = require('./getToken');
const getOne = require('./getOne');
const insertOne = require('./insertOne');
const validateEmail = require('./validateEmail');
const takeToken = require('./takeToken');
const getAll = require('./getAll');

module.exports = {
    validateEmail,
    doesEmailExists,
    insertOne,
    getToken,
    getOne,
    takeToken,
    getAll,
};
