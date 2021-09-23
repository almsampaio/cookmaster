const path = require('path');
const recipeService = require('../services/recipeService');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

const addImage = async (req, res) => {
try {
  const { filename } = req.file;
  const { id } = req.params;
  const image = `localhost:3000/src/uploads/${filename}`;
  const response = await recipeService.addPath(id, image);
  
  if (response === 1) {
  const updated = await recipeService.findById(id);
  return res.status(HTTP_OK_STATUS).json(updated);
  }
} catch (error) {
  return res.status(HTTP_NOT_FOUND_STATUS).json({ 
    Message: 'Sorry Our API is not working properly',
  });
}
};

const getByName = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    return res.status(200).sendFile(filePath);
  } catch (error) {
    return res.status(HTTP_OK_STATUS).json({ 
      Message: 'file do not exists',
    });
  }
};

module.exports = {
  addImage,
  getByName,
};