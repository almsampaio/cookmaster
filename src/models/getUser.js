const connection = require('./connection');

const getUser = async (collectionName, propertieObj) => {
    const db = await connection();
    const foundObj = await db.collection(collectionName).find(propertieObj).toArray();
    return foundObj;
};

module.exports = getUser;