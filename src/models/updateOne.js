const connection = require('./connection');

const updateOne = async (collectionsName, matchValues, newValues) => {
    const db = await connection();
    await db.collection(collectionsName).updateOne(matchValues, { $set: newValues });    
};

module.exports = updateOne;