const getConnection = require('./connection');

const collectionName = 'users';

const register = async (name, email, password) => {
    const db = await getConnection(); 
    const result = await db.collection(collectionName).insertOne({ name, email, password });
    return { _id: result.insertedId, name, email, password };
  };

const findByEmail = async (email) => {
    const db = await getConnection(); 
    const vemail = await db.collection(collectionName).findOne({ email });

    return vemail;
};

  module.exports = {
    register,
    findByEmail,
  }; 