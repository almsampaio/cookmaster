const {
    getUser,
} = require('../models');

const getOneUser = async (values) => {
    const [searched] = await getUser('users', values);
    return searched;
};

module.exports = getOneUser;