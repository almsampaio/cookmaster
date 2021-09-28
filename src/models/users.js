// const { ObjectId } = require('mongodb');
const connection = require('./connection');
const Connection = require('./connection');

const create = async (name, email, password) => {
    const db = await Connection();
    const data = await db.collection('users').insertOne({ name, email, password, role: 'user' });
    return { user: { name, email, _id: data.insertedId, role: 'user' } };
};

const findEmail = async (email) => {
    const db = await Connection();
    const data = await db.collection('users').findOne({ email });
    return data;
};

const findPassword = async (password) => {
    const db = await connection();
    const data = await db.collection('users').findOne({ password });
    return data;
};

module.exports = { create, findEmail, findPassword };
