const httpStatus = require('./httpStatus');

const INVALID_ENTRIES = {
  status: httpStatus.BAD_REQUEST,
  err: { message: 'Invalid entries. Try again.' },
};

const EMAIL_ALREADY_EXISTS = {
  status: httpStatus.CONFLICT,
  err: { message: 'Email already registered' },
};

const ALL_FIELDS_MUST_BE_FILLED = {
  status: httpStatus.UNAUTHORIZED,
  err: { message: 'All fields must be filled' },
};

const INCORRECT_EMAIL_OR_PASSWORD = {
  status: httpStatus.UNAUTHORIZED,
  err: { message: 'Incorrect username or password' },
};

const JWT_MALFORMED = {
  status: httpStatus.UNAUTHORIZED,
  err: { message: 'jwt malformed' },
};

const UNAUTHORIZED_MISSING_TOKEN = {
  status: httpStatus.UNAUTHORIZED,
  err: { message: 'missing auth token' },
};

module.exports = {
  INVALID_ENTRIES,
  EMAIL_ALREADY_EXISTS,
  ALL_FIELDS_MUST_BE_FILLED,
  INCORRECT_EMAIL_OR_PASSWORD,
  JWT_MALFORMED,
  UNAUTHORIZED_MISSING_TOKEN,
};