const { Router } = require('express');
const { createUser } = require('../middlewares/users/createUser');
const { getAllUsers } = require('../middlewares/users/getAllUsers');
const { getUserById } = require('../middlewares/users/getUserById');

const { nameValidation } = require('../middlewares/users/nameValidation');
const { passwordValidation } = require('../middlewares/users/passwordValidation');
const { emailValidation } = require('../middlewares/users/emailValidation');
const { emailUniqueValidation } = require('../middlewares/users/emailUniqueValidation');
const { removeUser } = require('../middlewares/users/removeUser');

const router = Router();

router.post('/',
nameValidation,
passwordValidation,
emailValidation,
emailUniqueValidation,
createUser, async () => {});
/* REQUISIÇÃO:
http POST :3000/users/ name='Lucas' email='lucas@gmail.com' password='Senha123'

http POST :3000/users/ name='Lucas' email='lucas@gmail.com' password='Senha123'
http POST :3000/users/ name='Lucas' email='lucas@gmail.com' password='Senha123'
http POST :3000/users/ name='Lucas' email='lucas@gmail.com' password='Senha123'
*/

router.get('/', getAllUsers, async () => {});
/* REQUISIÇÃO:
http GET :3000/users
*/

router.get('/:id', getUserById, async () => {});
/* REQUISIÇÃO:
http GET :3000/users/614f93d4731b88de6cfb03e6
*/

router.delete('/:id', removeUser, async () => {});
/* REQUISIÇÃO:
http DELETE :3000/users/614f93d4731b88de6cfb03e6
*/

module.exports = router;
