function errorsPostUsers(err, res) {
  if (err.isJoy) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  return res.status(409).json({ message: 'Email already registered' });
}

function errorsPostLogin(err, res) {
  if (err.isJoy) {
    if (err.filled === false) return res.status(401).json({ message: 'All fields must be filled' });
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
}

function errorsPostRecipes(err, res) {
  console.log('entrou no post recipes');
    if (err.isJoy) {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }

    return res.status(401).json({ message: 'jwt malformed' });
}

function errorsPost(err, res) {
  if (err.item === 'createUsers') return errorsPostUsers(err, res);
  
  if (err.item === 'loginUsers') return errorsPostLogin(err, res);
  
  if (err.item === 'createRecipes') return errorsPostRecipes(err, res);
}

function errorsGetRecipes(err, res) {
  return res.status(404).json({ message: 'recipe not found' });
}

function errorsGet(err, res) {
  if (err.item === 'getRecipesById') return errorsGetRecipes(err, res);
}

module.exports = (err, _req, res, _next) => {
  if (err.verb === 'post') return errorsPost(err, res);
  
  if (err.verb === 'get') return errorsGet(err, res);

  return res.status(500).json({ message: 'Internal server error' });
};