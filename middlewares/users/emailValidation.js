const empytEmail = (email) => { 
  if (!email) { return true; }
  return false;
};

function invalidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !regex.test(email);
}

// Middleware para validação do email
const emailValidation = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (empytEmail(email)) {
      throw new Error('Invalid entries. Try again.');
    }
    if (invalidEmail(email)) {
      throw new Error('Invalid entries. Try again.');
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { emailValidation };
