const jwt = require('jsonwebtoken');
const userModel = require('../models/users');

const SECRET = 'meu_segredo';

const checkToken = async (req, res, next) => {
    const token = req.headers.authorization; 
    if (!token) return res.status(401).json({ message: 'missing auth token' });
    try {
        const payload = jwt.verify(token, SECRET);
        console.log('validToken', payload);
        const user = await userModel.getEmail(payload.email);
        if (!user) return res.status(401).json({ message: 'jwt malformed' });
        req.user = user;
        next();
    } catch (e) {
        res.status(401).json({ message: e.message });
    }
}; 

module.exports = {
   checkToken,
};
