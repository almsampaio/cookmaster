const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!email || validEmail.test(email) === false) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const isValidQuanty = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
  return res.status(422).json({ err: { code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1' } });
  }

  if (typeof quantity !== 'number') {
    return res.status(422).json({ err: { code: 'invalid_data',
      message: '"quantity" must be a number' } });
  }

  next();
};

const isValidSales = (req, res, next) => {
  let err = null;

  req.body.forEach((sale) => {
    if (typeof sale.quantity !== 'number') {
      err = { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
    }
    if (sale.quantity <= 0) {
      err = { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
    }
  });
  if (err !== null) return res.status(422).json(err);

  next();
};

module.exports = {
  isValidEmail,
  isValidQuanty,
  isValidSales,
};