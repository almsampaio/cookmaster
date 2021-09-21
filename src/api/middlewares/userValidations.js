const userModel = require('../models/userModel');

function nameValidation(name) {
  if (!name) {
    return false;
  }

  return true;
}

function validateEmailFormat(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(String(email).toLowerCase());
}

function emailValidation(email) {
  if (!email) {
    return false;
  }

  if (!validateEmailFormat(email)) {
    return false;
  }

  return true;
}

function passwordValidation(password) {
  if (!password) {
    return false;
  }

  return true;
}

async function emailAlreadyExists(email) {
  const emailExists = await userModel.findByEmail(email);

  if (emailExists && emailExists.email) {
    return false;
  } 

  return true;
}

async function userCreateValidations(req, res, next) {
  const { name, email, password } = req.body;

  if (
    !nameValidation(name) 
    || !emailValidation(email) 
    || !passwordValidation(password)) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  const emailsExists = await emailAlreadyExists(email);

  if (!emailsExists) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  next();
}

module.exports = userCreateValidations;