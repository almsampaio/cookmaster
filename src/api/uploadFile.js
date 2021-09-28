const multer = require('multer');
 const model = require('../models/recipes');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});
const upload = multer({ storage });

module.exports = [
  upload.single('image'),
    async (req, res) => {
      const { id } = req.params;
      const { file } = req;
      const imagePath = file.path;
      const image = `localhost:3000/${imagePath}`;
    
      const recipe = await model.findRecipesById(id);
  
      if (recipe) {
        const { _id, name, ingredients, preparation, userId } = recipe;
        const result = { _id, name, ingredients, preparation, userId, image };
        return res.status(200).json(result);
      }
      return res.status(404).json({ message: 'Id não encontrado' });
    },
  ]; 