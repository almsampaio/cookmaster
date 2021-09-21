const express = require('express');

const controllers = require('../controllers/usersController');

const router = express.Router();

// router.get('/', controllers.getAllSales);

// router.get('/:id', controllers.getOneSale);

// router.put('/:id', controllers.updateSale);

router.post('/', controllers.create);

// router.delete('/:id', controllers.deleteSale);

module.exports = router;