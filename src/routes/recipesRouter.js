const express = require('express');

const router = express.Router();

const RecipeController = require('../controllers/RecipeController');

const authMiddleware = require('../middlewares/authMiddleware');

const { upload } = require('../utils/upload');

router.post('/', authMiddleware.authLogin, RecipeController.create);
router.get('/', RecipeController.getAll);
router.get('/:id', RecipeController.getById);
router.put('/:id', authMiddleware.authLogin, RecipeController.update);
router.delete('/:id', authMiddleware.authLogin, RecipeController.remove);
router.put('/:id/image', 
  authMiddleware.authLogin, upload.single('image'), RecipeController.updateImg);

module.exports = router;