const GenericDAOMongoDB = require('./GenericDAOMongoDB');

class UserModel extends GenericDAOMongoDB {
  constructor() {
    super('users');
  }
}

module.exports = UserModel;