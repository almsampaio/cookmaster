// Verifica se o nome da receita foi preenchida
const verificarNome = async (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

// Verifica se os ingredientes da receita foram preenchidos
const verificarIngrediente = async (req, res, next) => {
  const { ingredients } = req.body;
  if (!ingredients || ingredients === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

// Verifica se o modo de preparo da receita foi preenchido
const verificarModoDePreparo = async (req, res, next) => {
  const { preparation } = req.body;
  if (!preparation || preparation === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = {
  verificarNome,
  verificarIngrediente,
  verificarModoDePreparo,
};