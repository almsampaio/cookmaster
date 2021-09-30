const router = require('express').Router();
const controlUsers = require('../controller/users');
const validation = require('../middlewares/validations');

const userValidation = [validation.nameValidation, validation.quantityValidation];

router.post('/', userValidation, controlUsers.controlCreate);
// router.get('/', controller.controllerGetAll);
// router.get('/:id', controller.controllerGetById);
// router.put('/:id', productValidation, controller.controllerUpdate);
// router.delete('/:id', controller.controllerDelete);

module.exports = router;