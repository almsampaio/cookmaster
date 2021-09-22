const connection = require('./connection');

const createUsers = async (email, password, name) => { 
   const db = await connection.mongoDB();
   const newUser = await db.collection('users').insertOne({ name, email, password });
   return { _id: newUser.insertedId, email, name, role: 'user' };
};

const getUserByEmail = async (email) => {
    const db = await connection.mongoDB();
    const user = await db.collection('users').findOne({ email });
    return user;
};

module.exports = {
    createUsers,
    getUserByEmail,
};
