const { INVALID_ENTRIES, DUPLICITY_EMAIL } = require('./errorMessages');
const { BAD_REQUEST, CONFLICT } = require('./statusClientErrors');

const badRequest = { status: BAD_REQUEST, message: { message: INVALID_ENTRIES } };
const conflict = { status: CONFLICT, message: { message: DUPLICITY_EMAIL } };

module.exports = {
  badRequest,
  conflict,
};
