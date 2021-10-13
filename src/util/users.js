const jwt = require('jsonwebtoken');

const SECRET = 'meu segredo';

const middToken = (req, res, next ) => {
    try {
        const token = req.headers.authorization;
    
        const payload = jwt.verify(token, SECRET);
     
        next();
    } catch (err) {
        res.status(401).json({message: 'invalide token'}
    };
};

const validateEmail = async (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

module.exports = {
    validateEmail,
    middToken,
};
