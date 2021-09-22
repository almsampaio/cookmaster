const lo = require('lodash');
const { StatusCodes } = require('http-status-codes');

const obj = {};
Object.keys(StatusCodes).forEach((code) => {
  obj[`${lo.camelCase(code)}Error`] = (message) => {
    const error = new Error(message);
    error.code = StatusCodes[code];
    return error;
  };
});
module.exports = obj;
