const { insertOneElement } = require('../models');

const insertOne = async (collectionName, user) => {    
    const { ops } = await insertOneElement(collectionName, user);    
    const [newUser] = ops;
    return newUser;
};

module.exports = insertOne;