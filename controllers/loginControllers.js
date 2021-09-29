const { Router } = require('express');

const { loginValidation } = require('../middlewares/login/loginValidation');
const { emptyFildValidation } = require('../middlewares/login/emptyFildValidation');
const { tokenGenerator } = require('../middlewares/authentication/tokenGenerator');

const router = Router();

router.post('/',
emptyFildValidation,
loginValidation,
tokenGenerator,
async () => {});
/* REQUISIÇÃO:
// GOOD REQUEST
# user
http POST :3000/login/ email='lucas@gmail.com' password='Senha123'
*/

module.exports = router;
