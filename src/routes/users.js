const rescue = require('express-rescue');
const usersController = require('../controllers/Users');
const token = require('../utils/token');

const users = (app) => {
  app.route('/users')
    .post(rescue(usersController.createUser));

  app.route('/login')
    .post(rescue(usersController.login));

  app.route('/users/admin')
    .post(rescue(token.validateToken), rescue(usersController.insertNewAdmin));
};

module.exports = users;