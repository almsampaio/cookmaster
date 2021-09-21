const { ObjectId } = require('mongodb');
const { getUser } = require('../models');

const getById = async (collectionName, idString) => {    
    try {
        const id = new ObjectId(idString);
        const searchObj = { _id: id };
        const [element] = await getUser(collectionName, searchObj);          
        return element;
    } catch (e) {
        return false;
    }
};

module.exports = getById;