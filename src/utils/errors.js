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

const loginError = {
  error: { 
    message: 'All fields must be filled',
    status: 401 },
};

const credentialsError = {
  error: { 
    message: 'Incorrect username or password',
    status: 401 },
};

const jwtError = {
  error: { 
    message: 'jwt malformed',
    status: 401 },
};

const withoutTokenError = {
  error: { 
    message: 'missing auth token',
    status: 401 },
};

const recipeError = {
  error: { 
    message: 'recipe not found',
    status: 404 },
};

const adminError = {
  error: { 
    message: 'Only admins can register new admins',
    status: 403 },
};

module.exports = {
  createError,
  emailError,
  loginError,
  credentialsError,
  jwtError,
  withoutTokenError,
  recipeError,
  adminError,
};