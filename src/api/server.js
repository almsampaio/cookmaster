const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = require('./app');
const middlewaresUser = require('./middlewares/usersMiddlewares');
const userController = require('./controllers/usersController');
const middlewaresRecipes = require('./middlewares/recipesMidllewares');
const recipesControllers = require('./controllers/recipesControllers');

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${req.params.id}.jpeg`);
    },
  });
  
  const upload = multer({ storage });

app.post('/users', middlewaresUser.validateEmailAlreadyExists,
userController.createUser);

app.post('/login', userController.validateUserAndSendToken);

 app.post('/recipes',
 middlewaresRecipes.validateRecipe,
 recipesControllers.createRecipe);

app.get('/recipes', recipesControllers.getAll);

app.get('/recipes/:id', recipesControllers.getById);

app.put('/recipes/:id', recipesControllers.updateById);

app.delete('/recipes/:id', recipesControllers.deleteById);

app.put('/recipes/:id/image', upload.single('image'), recipesControllers.addImage);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
