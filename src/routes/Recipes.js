const express = require('express');
const multer = require('multer');
const path = require('path');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateEntries } = require('../middlewares/recipesValidations');
const Recipes = require('../controllers/Recipes');

const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });

router.post('/', validateJWT, validateEntries, Recipes.create);

router.get('/', Recipes.getAll);

router.get('/:id', Recipes.getById);

router.put('/:id', validateJWT, Recipes.update);

router.delete('/:id', validateJWT, Recipes.remove);

router.put('/:id/image', validateJWT, upload.single('image'), Recipes.uploadFile);

module.exports = router;