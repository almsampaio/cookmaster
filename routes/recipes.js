const express = require('express');
const multer = require('multer');

const validations = require('../middlewares/validations');
const recipesValidations = require('../middlewares/recipesValidations');
const recipesController = require('../controllers/recipesController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

router.post('/',
  validations.validateName,
  recipesValidations.validateIngredients,
  recipesValidations.validatePreparation,
  validations.validateAuth,
  recipesController.create);

router.get('/', recipesController.getAll);

router.get('/:id', recipesController.getById);

router.put('/:id',
  validations.validateAuth,
  recipesController.update);

router.delete('/:id',
  validations.validateAuth,
  recipesController.exclude);

router.put('/:id/image/',
  validations.validateAuth,
  upload.single('image'),
  recipesController.addImage);

module.exports = router;