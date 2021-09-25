// Conectando a camada Controllers com a camada Services
const receitasService = require('../services/receitasService');

// Conectando a camada Controllers com a camada Model
const receitasModel = require('../models/receitasModel');

const cadastrarReceita = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const userID = req.user;
  const cadastrar = await receitasService
  .cadastrarUsuario(name, ingredients, preparation, userID);

  return res.status(201).json(cadastrar);
};

const listarReceitas = async (_req, res) => {
  const receitas = await receitasModel.listarReceitas();
  return res.status(200).json(receitas);
};

const listarReceitasPorID = async (req, res) => {
  const { id } = req.params;
  const receita = await receitasModel.listarReceitasPorID(id);
  if (!receita) return res.status(404).json({ message: 'recipe not found' });
  
  return res.status(200).json(receita);
};

module.exports = {
  cadastrarReceita,
  listarReceitas,
  listarReceitasPorID,
};