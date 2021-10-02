const express = require('express');
const multer = require('multer');
const UserValidation = require('./controllers/middlewares/validations/UserValidation');
const UserController = require('./controllers/UserController');
const LoginValidation = require('./controllers/middlewares/validations/LoginValidation');
const RecipeValidation = require('./controllers/middlewares/validations/RecipeValidation');
const RecipeController = require('./controllers/RecipeController');
const Auth = require('./controllers/middlewares/Auth');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'src/uploads');
    },
    filename: (req, file, callback) => {
        callback(null, `${req.params.id}.jpeg`);
    },
});

const upload = multer({ storage });

router.post('/users', UserValidation.execute, UserController.register);
router.post('/login', LoginValidation.execute, UserController.login);
router.post(
    '/recipes',
    RecipeValidation.execute,
    (request, response, next) => new Auth().validateToken(request, response, next),
    RecipeController.register,
);
router.get('/recipes', RecipeController.list);
router.get('/recipes/:id', RecipeController.getById);
router.put(
    '/recipes/:id',
    (request, response, next) => new Auth().validateToken(request, response, next),
    RecipeController.update,
);
router.delete(
    '/recipes/:id',
    (request, response, next) => new Auth().validateToken(request, response, next),
    RecipeController.delete,
);
router.put(
    '/recipes/:id/image/',
    (request, response, next) => new Auth().validateToken(request, response, next),
    upload.single('image'),
    RecipeController.upload,
);

module.exports = { router };
