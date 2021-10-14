const rescue = require('express-rescue');
const usersController = require('../controllers/Users');

const users = (app) => {
  app.route('/users')
    .post(rescue(usersController.createUser));
  app.route('/login')
    .post(rescue(usersController.login));
};

module.exports = users;