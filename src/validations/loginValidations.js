const UNAUTHORIZED_MISSING_FIELDS = {
  status: 401,
  error: {
    message: 'All fields must be filled',
  },
};

const UNAUTHORIZED_INVALID_CREDENTIALS = {
  status: 401,
  error: {
    message: 'Incorrect username or password',
  },
};

const validateFields = (email, password) => {
  if (!email || !password) throw UNAUTHORIZED_MISSING_FIELDS;
};

const validateCredentials = (user, password) => {
  if (!user || user.password !== password) throw UNAUTHORIZED_INVALID_CREDENTIALS;
};

module.exports = { validateFields, validateCredentials };
