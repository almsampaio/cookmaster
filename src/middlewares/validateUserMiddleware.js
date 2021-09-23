const recipeModel = require('../models/recipeModel');

module.exports = async (req, res, next) => { 
try {
  const { user } = req;
  const { id } = req.params;
  
  const recipe = await recipeModel.getById(id);
  const receivedUserId = '_id';
  if (recipe.userId.toString() !== user[receivedUserId].toString() && user.role !== 'admin') {
    return res.status(401).json({ message: 'user not alllowed for this operation' });
  }
  
  next();
} catch (error) {
  console.log(error);
  return res.status(401).json({ message: 'Sorry the API isnt working properly' });
  }
};