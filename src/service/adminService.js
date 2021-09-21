const adminModels = require('../models/adminModels');

const verifyPermission = async (user) => {
  const { role } = user;

  if (role === 'admin') {
    return null;
  }

  return { message: 'Only admins can register new admins' };
};

const postAdmin = async (user, name, password, email) => {
  const invalidEntries = await verifyPermission(user);

  if (invalidEntries) {
    return invalidEntries;
  }

  return {
    user: await adminModels.postAdmin(name, password, email),
  };
};

module.exports = { postAdmin };
