const { getUser } = require('../models');

const doesEmailExists = async (email) => {
    const documents = await getUser('users', { email });    
    if (documents.length > 0) return true;
    return false;
};

module.exports = doesEmailExists;