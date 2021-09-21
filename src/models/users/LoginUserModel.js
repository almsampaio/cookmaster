const connection = require('../connection');

class GetUserByEmailAndPasswordModel {
  constructor(user) {
    this.user = user;
  }

  async handle() {
    const db = await connection();

    const { email, password } = this.user;

    const usersCollection = await db.collection('users');

    const user = await usersCollection.findOne({ email, password });

    if (!user) return null;

    return user;
  }
}

module.exports = GetUserByEmailAndPasswordModel;
