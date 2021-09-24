// // Conectando validarLogin.js com a camada Models
const usuariosModel = require('../models/usuariosModel');

// Verifica se o email do usuário foi preenchido
const verificarEmail = async (req, res, next) => {
  const { email } = req.body;
  
  if (!email || email === '') {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  next();
};

// Verifica se a senha do usuário foi preenchida
const verificarSenha = async (req, res, next) => {
  const { password } = req.body;
  
  if (!password || password === '') {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  next();
};

// Verifica se o email do usuário foi preenchido da forma correta
const verificarEmailValido = async (req, res, next) => {
  const { email } = req.body;
  
  // Padrão para o RegEx: https://regexr.com/2ri2c
  // Mesmo pattern utilizado no projeto App de Receitas
  const pattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
  const compararPattern = email.match(pattern);
  if (!compararPattern) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  next();
};

// Verifica sae a senha do usuário é válida
const verificarSenhaValida = async (req, res, next) => {
  const { password } = req.body;
  
  const buscarPelaSenha = await usuariosModel.buscarPelaSenha(password);
  if (!buscarPelaSenha) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  next();
};

module.exports = {
  verificarEmail,
  verificarSenha,
  verificarEmailValido,
  verificarSenhaValida,
};