// CONTROLLER

const createUserService = require('../../services/createUserService');

const createUserController = async (req, res) => {
    const { name, email, password } = req.body;
    
    const user = await createUserService(name, email, password);
    return res.status(user.status).json(user.message);
};

module.exports = createUserController;