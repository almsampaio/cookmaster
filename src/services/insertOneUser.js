const { insertOneElement } = require('../models');

const insertOneUser = async (user) => {    
    const { ops } = await insertOneElement('users', { ...user, role: 'user' });    
    const [newUser] = ops;
    return newUser;
};

module.exports = insertOneUser;