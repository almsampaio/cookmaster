const path = require('path');
const multer = require('multer');
const express = require('../utils/express-rest');
const { usersController, loginController, recipesController } = require('../controllers');

const routes = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, _file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

routes.post('/users', usersController.create);
routes.post('/login', loginController.login);
routes.rest('/recipes', recipesController);
routes.put('/recipes/:id/image', upload.single('image'), recipesController.updateImage);
routes.get('/', (_req, res) => res.send());

module.exports = routes;
