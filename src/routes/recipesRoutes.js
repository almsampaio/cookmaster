const bodyParser = require('body-parser');
const express = require('express');
const recipesController = require('../controllers/recipesController');
const validateJWT = require('../api/auth/validateJWT');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', validateJWT, recipesController.create);
router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getById);
router.put('/:id', validateJWT, recipesController.update);

module.exports = router;
