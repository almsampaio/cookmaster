const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const recipesController = require('../controllers/recipesController');
const validateJWT = require('../api/auth/validateJWT');

const router = express.Router();

router.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

router.post('/', validateJWT, recipesController.create);
router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getById);
router.put('/:id', validateJWT, recipesController.update);
router.delete('/:id', validateJWT, recipesController.exclude);
router.put('/:id/image/', validateJWT, upload.single('image'), recipesController.addImage);

module.exports = router;
