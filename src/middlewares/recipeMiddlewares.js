const multer = require('multer');
const path = require('path');

const validateRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const dirUploads = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: dirUploads,
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage }).single('image');

module.exports = {
  validateRecipe,
  upload,
};
