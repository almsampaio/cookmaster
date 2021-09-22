const path = require('path');
const recipeModel = require('../models/recipeModel');

const HTTP_OK_STATUS = 200;
const HTTP_NO_CONTENT_STATUS = 204;
const HTTP_NOT_FOUND_STATUS = 404;

const addImage = async (req, res) => {
  try {
    const { filename } = req.file;
    const { id } = req.params;
    const image = `localhost:3000/src/uploads/${filename}`;
    const response = await recipeModel.addPath(id, image);
    if (response === 1) {
    const updated = await recipeModel.getById(id);
    return res.status(HTTP_OK_STATUS).json(updated);
    }
    return res.status(HTTP_NO_CONTENT_STATUS).end();
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
    console.log(filePath);
    return res.status(HTTP_OK_STATUS).sendFile(filePath);
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