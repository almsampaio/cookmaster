const { insertOneUser } = require('../services');

const insertUserController = async (req, res) => {
    const { name, email, password } = req.body;    
    const newUser = await insertOneUser({ name, email, password });
    delete newUser.password;
    return res.status(201).json({ user: newUser });
};

module.exports = insertUserController;