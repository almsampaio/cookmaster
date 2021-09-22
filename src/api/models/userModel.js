const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

module.exports = {
  async create(name, email, password, role = 'user') {
    const db = await mongoConnection();
    const userCollection = await db.collection('users');

    const newUser = await userCollection.insertOne({ name, email, password, role });

    return {
      _id: newUser.insertedId, name, email, role,
    };
  },

  async findByEmail(email) {
    const db = await mongoConnection();
    const userCollection = await db.collection('users');

    const user = await userCollection.findOne({ email });

    return user;
  },

  async findById(id) {
    const db = await mongoConnection();
    const userCollection = await db.collection('users');

    const user = await userCollection.findOne({ _id: ObjectId(id) });

    return user;
  },
 
};