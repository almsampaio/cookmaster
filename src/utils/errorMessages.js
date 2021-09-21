const INVALID_ENTRIES = {
  status: 400,
  err: { message: 'Invalid entries. Try again.' },
};

const EMAIL_ALREADY_EXISTS = {
  status: 409,
  err: { message: 'Email already registered' },
};

module.exports = {
  INVALID_ENTRIES,
  EMAIL_ALREADY_EXISTS,
};