const {
    getUser,
} = require('../models');

const rootUser = { name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };

const validateAdmin = async (id) => {
    const [admin] = await getUser('users', rootUser);    
    const adminId = '_id';
    if (`${id}` === `${admin[adminId]}`) return true;
    return false;
};

module.exports = validateAdmin;