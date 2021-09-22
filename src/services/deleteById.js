const { ObjectId } = require('mongodb');
const { deleteOne } = require('../models');

const deleteById = async (collection, id) => {
    try {
        const objectMatch = { _id: new ObjectId(id) };
        await deleteOne(collection, objectMatch);
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = deleteById;