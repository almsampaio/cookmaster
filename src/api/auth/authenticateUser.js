const recipeModel = require('../../models/recipeModel');

module.exports = async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const { userId } = await recipeModel.find(id);
  
  if (user.id !== userId && user.role !== 'admin') {
 return res
    .status(401)
    .json({
      message: 'This user cannot perform this action',
    }); 
}
  
  next();
};