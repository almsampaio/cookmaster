const connection = require('../connection');

const findUserModel = async (email) => {
    const db = await connection();
    const user = await db.collection('users').findOne({ email });
    return user;
};

const createUserModel = async (name, email, password) => {
    const db = await connection();

    const user = await db.collection('users')
        .insertOne({ name, email, password, role: 'user' });

    delete user.ops[0].password;

    return { user: user.ops[0] };
};

const loginModel = async (email, password) => {
    const db = await connection();
    const user = await db.collection('users').findOne({ email, password });
    return user;
};

const getAllUsersModel = async () => {
    const db = await connection();
    const users = await db.collection('users').find({}).toArray();
    return users;
};

const deleteAllUsersModel = async () => {
    const db = await connection();
    const users = await db.collection('users').remove({});
    return users;
};

module.exports = {
    createUserModel,
    findUserModel,  
    loginModel,  
    getAllUsersModel,
    deleteAllUsersModel,
};