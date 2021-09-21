const connection = require('./connection');

const insertOneElement = async (collectionName, value) => {
    const db = await connection();    
    const inseertedResult = await db.collection(collectionName).insertOne(value)
    .catch(() => false);    
    return inseertedResult;
};

module.exports = insertOneElement;