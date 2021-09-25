const router = require('express').Router();
const multer = require('multer');

const recipesController = require('../controllers/recipesController');

const uploadConfig = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ uploadConfig });

// CREATE
router.post('/', recipesController.register);

// READ
router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getById);

// UPDATE
router.put('/:id', recipesController.update);
router.put('/:id/image', upload.single('image'), recipesController.uploadFile);

// DELETE
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;
