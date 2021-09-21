const registerUser = require('../Controllers/users');

module.exports = {
  // getPosts: require('../controllers/posts'),
  createUsers: registerUser.createUser,
  // login: require('../controllers/login'),
};
