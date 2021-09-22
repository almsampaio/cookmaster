const connect = require('./connection');

module.exports = {
  get: {
    async byEmail(email) {
      const db = await connect();
      return db.collection('users').findOne({ email });
    },
  },

  async create(user) {
    const db = await connect();
    const creation = await db.collection('users').insertOne({ ...user, role: 'user' });
    const { password, ...userCreated } = creation.ops[0];
    return userCreated;
  },
};
