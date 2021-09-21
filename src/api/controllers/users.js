const usersServices = require('../services/users');

const postUsers = async (req, res, next) => {
  const { name, email, password } = req.body;
  const PostUsers = await usersServices.postUsers({ name, email, password });
  if (PostUsers.error) return next(PostUsers);
};

module.exports = {
  postUsers,
};