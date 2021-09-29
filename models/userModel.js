// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const registerUser = async (name, email, password) => {
    const db = await connect();
    const user = await db.collection('users').insertOne({ name, email, password, role: 'user' });
    return { user: { name, email, role: 'user', _id: user.insertedId } };
};

const findEmail = async (email) => {
    // if (!ObjectId.isValid(id)) return false;
    const db = await connect();
    const user = await db.collection('users').findOne({ email });
    if (!user) return false;
    return user;
};

const checkLogin = async (email, password) => {
    const db = await connect();
    const user = await db.collection('users').findOne({ email, password });
    console.log('user', user);
    if (!user) return false;
    return user;
};

module.exports = {
    registerUser,
    findEmail,
    checkLogin,
};
