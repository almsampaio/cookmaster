const invalidEntries = 'Invalid entries. Try again.';

async function verifyName(req, res, next) {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: invalidEntries });
  }
  next();
}

async function verifyIngredients(req, res, next) {
  const { ingredients } = req.body;
  if (!ingredients || ingredients === '') {
    return res.status(400).json({ message: invalidEntries });
  }

  next();
}

async function verifyPreparation(req, res, next) {
  const { preparation } = req.body;
  if (!preparation || preparation === '') {
    return res.status(400).json({ message: invalidEntries });
  }

  next();
}
module.exports = {
  verifyName,
  verifyIngredients,
  verifyPreparation,
};