const connection = require('./connection');

const getUser = async (collectionName, propertieObj) => {
    const db = await connection();
    const user = await db.collection(collectionName).find(propertieObj).toArray();
    return user;
};

module.exports = getUser;