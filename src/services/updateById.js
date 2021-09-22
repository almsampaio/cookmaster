const { ObjectId } = require('mongodb');
const {
    updateOne,
} = require('../models');

const updateById = async (collectionName, id, values) => {
    try {
        const matchObj = { _id: new ObjectId(id) };
        await updateOne(collectionName, matchObj, values);
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = updateById;