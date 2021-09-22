// MODEL

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

module.exports = {
    createUserModel,
    findUserModel,  
    loginModel,  
};