const connection = require('./connection');

const deleteOne = async (collectionName, valuesMatch) => {
    const db = await connection();
    await db.collection(collectionName).deleteOne(valuesMatch);
    return true;
};

module.exports = deleteOne;