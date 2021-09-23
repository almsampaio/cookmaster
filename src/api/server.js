const bodyParser = require('body-parser');
const app = require('./app');
const middlewaresUser = require('./middlewares/usersMiddlewares');
const userController = require('./controllers/usersController');
const middlewaresRecipes = require('./middlewares/recipesMidllewares');
const recipesControllers = require('./controllers/recipesControllers');

const PORT = 3000;

app.use(bodyParser.json());

app.post('/users', middlewaresUser.validateEmailAlreadyExists,
userController.createUser);

app.post('/login', userController.validateUserAndSendToken);

 app.post('/recipes',
 middlewaresRecipes.validateRecipe,
 recipesControllers.createRecipe);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
