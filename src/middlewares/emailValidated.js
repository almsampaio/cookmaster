const Email = require('./validations/isValidEmail');

const emailValidated = (req, res, next) => {
  const { email } = req.body;
  const response = Email.isValidEmail(email);
  if (response) {
    return res.status(response.status).json({
      message: response.message,
    });
  }
  next();
};

module.exports = { emailValidated };