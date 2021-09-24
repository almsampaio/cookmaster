const router = require('express').Router();
const Users = require('../controllers/users');
const Wares = require('../middlewares');

router.post('/', Users.create);
router.post('/admin', Wares.authToken, Wares.authAdmin, Users.createAdmin);

module.exports = router;