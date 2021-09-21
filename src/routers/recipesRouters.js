const express = require('express');

const controllers = require('../controllers/productController');

const router = express.Router();

router.get('/', controllers.getAllProducts);

router.get('/:id', controllers.getOneProduct);

router.put('/:id', controllers.updateProduct);

router.post('/', controllers.createProduct);

router.delete('/:id', controllers.deleteProduct);

module.exports = router;