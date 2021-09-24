const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Wares = require('../middlewares');
const Recipes = require('../controllers/recipes');

const pathRouter = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: pathRouter,
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

// Recipes
router.post('/', Wares.authToken, Recipes.create);
router.get('/', Recipes.getAll);
router.get('/:id', Recipes.getById);
router.put('/:id', Wares.authToken, Recipes.update);
router.delete('/:id', Wares.authToken, Recipes.remove);
router.put('/:id/image', upload.single('image'), Wares.authToken, Recipes.updateFile);

module.exports = router;