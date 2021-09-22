const {
    takeToken,
    validateAdmin,
    getById,
} = require('../services');

const message = 'missing auth token';

const INVALID_TOKEN = {
    message: 'jwt malformed',
};

const validateAuthetication = async (req, res, next) => {
    const { authorization } = req.headers;
    const { id } = req.params;
    const stringId = '_id';
    if (!authorization) return res.status(401).json({ message });
    const payload = takeToken(authorization);
    if (!payload) return res.status(401).json(INVALID_TOKEN);
    const recipe = await getById('recipes', id);    
    const isAdmin = await validateAdmin(payload.data[stringId]);    
    const isUser = payload.data[stringId] === recipe.userId;
    if (!isAdmin && !isUser) return res.status(401).json(INVALID_TOKEN);
    next();
};

module.exports = validateAuthetication;