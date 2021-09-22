const serviceUsers = require('../services/usersServices');

const createUser = async (req, res) => { 
    const { name, email, password } = req.body;
    const resultObj = await serviceUsers.validateInfosUsers(email, password, name);
    return res.status(resultObj.status).send(resultObj.obj);
};

module.exports = {
    createUser,
};
