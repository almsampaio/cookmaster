// // Conectando validarDadosUsuario.js com a camada Models
const usuariosModel = require('../models/usuariosModel');

// Verifica se o nome do usuário foi preenchido
const verificarNome = async (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

// Verifica se o email do usuário foi preenchido da forma correta
const verificarEmail = async (req, res, next) => {
  const { email } = req.body;
  
  if (!email || email === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  // Padrão para o RegEx: https://regexr.com/2ri2c
  // Mesmo pattern utilizado no projeto App de Receitas
  const pattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
  const compararPattern = email.match(pattern);
  if (!compararPattern) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

// Verifica se o email informado já existe no banco de dados
const verificarEmailExiste = async (req, res, next) => {
  const { email } = req.body;
  
  const buscarPeloEmail = await usuariosModel.buscarPeloEmail(email);
  if (buscarPeloEmail) return res.status(409).json({ message: 'Email already registered' });

  next();
};

module.exports = {
  verificarNome,
  verificarEmail,
  verificarEmailExiste,
};