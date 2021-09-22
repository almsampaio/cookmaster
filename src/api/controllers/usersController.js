const serviceUsers = require('../services/usersServices');

const createUser = async (req, res) => { 
    const { name, email, password } = req.body;
    const resultObj = await serviceUsers.validateInfosCreateUsers(email, password, name);
    return res.status(resultObj.status).send(resultObj.obj);
};

const validateUserAndSendToken = async (req, res) => {
    const { email, password } = req.body;
    const validateUser = await serviceUsers.validateUserAndSendToken(email, password);
    res.status(validateUser.status).json(validateUser.obj);
};

module.exports = {
    createUser,
    validateUserAndSendToken,
};
