const {
    getUser,
} = require('../models');

const getOne = async (collectionName, values) => {
    const [searched] = await getUser(collectionName, values);
    return searched;
};

module.exports = getOne;