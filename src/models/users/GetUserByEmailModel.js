const connection = require('../connection');

class GetUserByEmailModel {
  constructor(email) {
    this.email = email;
  }

  async handle() {
    const db = await connection();

    const usersCollection = await db.collection('users');

    const user = await usersCollection.findOne({ email: this.email });

    if (!user) return null;

    return user;
  }
}

module.exports = GetUserByEmailModel;
