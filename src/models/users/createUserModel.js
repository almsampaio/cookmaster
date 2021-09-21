// MODEL

const connection = require('../connection');

const createUserModel = async (name, email, password) => {
    const db = await connection();
    const user = await db.collection('users').insertOne({
        name,
        email,
        password,
    });
    return user.ops[0];
};

module.exports = createUserModel;