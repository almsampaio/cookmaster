const connection = require('../connection');

class RegistertUserModel {
  constructor(user, role = 'user') {
    this.user = user;
    this.role = role;
  }

  async handle() {
    const db = await connection();

    const usersCollection = await db.collection('users');

    const { ops } = await usersCollection.insertOne({
      ...this.user,
      role: this.role,
    });

    const { name, email, role, _id } = ops[0];

    return { user: { name, email, role, _id } };
  }
}

module.exports = RegistertUserModel;
