const bodyParser = require('body-parser');
const multer = require('multer');
const route = require('./routes');
const app = require('./app');
const Validated = require('../services/auth/ValidateJWT');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const PORT = 3000;
app.use(bodyParser.json());
const upload = multer({ storage });

app.post('/login', route.login);
app.post('/users', route.createUser);
app.post('/recipes', Validated, route.createRecipes);
app.get('/recipes', route.allRecipes);
app.get('/recipes/:id', route.recipById);
app.put('/recipes/:id/image', upload.single('image'), Validated, route.addImage);
app.put('/recipes/:id', Validated, route.updateRecipe);
app.delete('/recipes/:id', Validated, route.removeRecipe);

app.listen(
  PORT,
  () => console.log(`conectado na porta ${PORT}`),
);
