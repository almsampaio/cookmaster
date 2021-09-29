const { Router } = require('express');

const loginMiddleware = require('./loginMiddleware');
const authMiddleware = require('../authentication/authMiddleware');

const router = Router();

router.post('/',
loginMiddleware.emptyFildValidation,
loginMiddleware.loginValidation,
authMiddleware.tokenGenerator,
async () => {});
/* REQUISIÇÃO:
// GOOD REQUEST
# user
http POST :3000/login/ email='lucas@gmail.com' password='Senha123'
*/

module.exports = router;
