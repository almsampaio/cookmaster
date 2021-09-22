const recipeModel = require('../models/recipeModel');
const userSchema = require('../schema/userSchema');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const idValid = userSchema.validateId(id);
    if (!idValid) res.status(401).json({ message: 'invalid recipe Id' });
    const recipe = await recipeModel.getById(id);
    const receivedUserId = '_id';
    if (recipe.userId.toString() !== user[receivedUserId].toString() && user.role !== 'admin') {
      return res.status(401).json({ message: 'unauthorized uzer for this operation' });
    }
  
    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};