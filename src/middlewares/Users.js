const Joi = require('joi');

const newUserValidation = (name, email, password) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ name, email, password });

  if (error) throw error;
};

const loginBodyValidation = (email, password) => {
  if (!email || !password) {
    const error = new Error('All fields must be filled');
    error.code = 401;
    throw error;
  }
};

const userLoginValidation = (user) => {
  if (!user) {
    const error = new Error('Incorrect username or password');
    error.code = 401;
    throw error;
  }
};

const isAdmin = (role) => {
  if (role !== 'admin') {
    const error = new Error('Only admins can register new admins');
    error.code = 403;
    throw error;
  }
};

module.exports = {
  newUserValidation,
  loginBodyValidation,
  userLoginValidation,
  isAdmin,
};
