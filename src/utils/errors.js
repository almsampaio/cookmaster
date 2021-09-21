const createError = {
  error: { 
    message: 'Invalid entries. Try again.',
    status: 400 },
};

const emailError = {
  error: { 
    message: 'Email already registered',
    status: 409 },
};

module.exports = {
  createError,
  emailError,
};