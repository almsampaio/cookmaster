const {
    getUser,
} = require('../models');

const getAll = async (collectionName) => {
    const searched = await getUser(collectionName, {});
    return searched;
};

module.exports = getAll;