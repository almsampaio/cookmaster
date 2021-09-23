const Users = require('../models/usersModel');

const create = async (name, email, password) => {
  const existingUser = await Users.findByEmail(email);

  if (existingUser) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Email already registered',
      },
    };
  }

  return Users.create(name, email, password);
};

const createAdmin = async (name, email, password, role) => {
  const existingUser = await Users.findByEmail(email);

  if (existingUser) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Email already registered',
      },
    };
  }

  if (role !== 'admin') {
    return {
      err: {
        code: 'wrong_permision',
        message: 'Only admins can register new admins',
      },
    };
  }

  return Users.createAdmin(name, email, password);
};

module.exports = {
  create,
  createAdmin,
};
