const express = require('express');

const multer = require('multer');

const controller = require('../controllers/recipesController');

const { userAuthentication } = require('../controllers/loginController');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', controller.findById);

router.put('/:id', userAuthentication, controller.update);

router.post('/', userAuthentication, controller.create);

router.post(':id/image/', upload.single('image'));

router.delete('/:id', userAuthentication, controller.deleteRecipe);

module.exports = router;