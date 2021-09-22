const User = require('../models/User');

exports.create = async ({ name, email, password }) => {
  try {
    const user = await User.create({ name, email, password });

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
