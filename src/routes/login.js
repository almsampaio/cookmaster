const router = require('express').Router();
// const controlLogin = require('../controller/login');
const loginValidation = require('../middlewares/login');

router.post('/', loginValidation.loginValidation, loginValidation.tokenValidation);
// router.get('/', controller.controllerGetAll);
// router.get('/:id', controller.controllerGetById);
// router.put('/:id', productValidation, controller.controllerUpdate);
// router.delete('/:id', controller.controllerDelete);

module.exports = router;