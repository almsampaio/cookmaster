// const RecipeModel = require('../../models/Recipes');

module.exports = async (req, res, next) => {
    const { _id: userId, role } = req.user;
    
    if (role === 'admin' || !!userId) {
      next();
    } else {
      return res.status(401).json({ message: 'missing auth token' });
    }
};