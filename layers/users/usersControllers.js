const { Router } = require('express');

const usersMiddleware = require('./usersMiddleware'); 
const usersValidation = require('./usersValidation');

const router = Router();

router.post('/',
usersValidation.nameValidation,
usersValidation.passwordValidation,
usersValidation.emailValidation,
usersValidation.emailUniqueValidation,
usersMiddleware.createUser, async () => {});
/* REQUISIÇÃO:
http POST :3000/users name='Lucas' email='lucas@gmail.com' password='Senha123'
http POST :3000/users name='Tiago' email='tiago@gmail.com' password='Senha123'
*/

router.get('/',
usersMiddleware.getAllUsers,
async () => {});
/* REQUISIÇÃO:
http GET :3000/users
*/

router.get('/:id',
usersMiddleware.getUserById,
async () => {});
/* REQUISIÇÃO:
http GET :3000/users/614f93d4731b88de6cfb03e6
*/

router.delete('/:id',
usersMiddleware.removeUser,
async () => {});
/* REQUISIÇÃO:
http DELETE :3000/users/614f93d4731b88de6cfb03e6
*/

module.exports = router;
