const app = require('./app');

const Users = require('../controllers/UsersController');
const Recipes = require('../controllers/RecipesController');
const Validation = require('../middlewares/validations');

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.post('/users', [
  Validation.validateName, 
  Validation.validateEmail, 
  Validation.validatePassword,
  Users.createUser,
  ]);

app.post('/login', Users.userLogin);

app.post('/recipes', Validation.validateRecipeInfo, Validation.validateJWT, Recipes.createRecipe);

app.get('/recipes', Recipes.getAllRecipes);

app.get('/recipes/:id', Recipes.getRecipeById);

app.put('/recipes/:id', Validation.checkToken, Validation.validateJWT, Recipes.updateRecipe);

app.delete('/recipes/:id', Validation.checkToken, Recipes.deleteRecipe);
