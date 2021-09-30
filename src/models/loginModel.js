const { connection } = require('../connection/connection');

const { newToken } = require('../middlewares/token');

const userLogin = async (email) => {
    const db = await connection();

    const findEmail = await db.collection('users').findOne({ email });
    const { password, name, ...data } = findEmail;
    return newToken(data);
};

module.exports = { userLogin };
