const { insertOne } = require('../services');

const insertUserController = async (req, res) => {
    const { name, email, password } = req.body;    
    const newUser = await insertOne('users', { name, email, password, role: 'user' });
    delete newUser.password;
    return res.status(201).json({ user: newUser });
};

module.exports = insertUserController;