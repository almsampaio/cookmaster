const errorValidateRequire = {
  status: 401,
    error: {
      message: 'All fields must be filled',
    },
};

const errorValidateData = {
  status: 401,
  error: {
    message: 'Incorrect username or password',
  },
};

const validateRequire = (email, password) => {
  if (!email || !password) throw errorValidateRequire;
};

const validateUserRequired = (user, password) => {
  if (!user || user.password !== password) throw errorValidateData;
};

module.exports = {
  validateRequire,
  validateUserRequired,
};
