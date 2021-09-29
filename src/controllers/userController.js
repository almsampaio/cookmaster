const services = require('../services/userServices');
// const model = require('../models/userModel');

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await services.create(name, email, password);

  if (user.message) return res.status(409).json(user);
  // se createUser tiver um atributo/Chave com o valor message, quer dizer que deu erro, então retornamos res.status de erro

  return res.status(201).json(user);
};

module.exports = {
  create,
};