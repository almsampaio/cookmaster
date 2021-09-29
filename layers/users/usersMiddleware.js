const { ObjectId } = require('mongodb');
const usersServices = require('./usersServices');

// Middleware para listar todos os usuários
const getAllUsers = async (_req, res) => {
  const data = await usersServices.getAll();
  return res.status(200).json({ users: data });
};

// Middleware para listar um usuário pelo id
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) throw new Error('user not found');
    const user = await usersServices.getById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Middleware para cadastrar um usuário
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const role = 'user';
    const data = await usersServices.create(name, email, password, role);
    const { _id } = data;
    return res.status(201).json({ user: { name, email, role, _id } });
};

// Middleware para cadastrar um usuário
const removeUser = async (req, res) => {
  const { id } = req.params;
  const deletedRecipe = await usersServices.remove(id);
  console.log(deletedRecipe.value);
  return res.status(200).json(deletedRecipe.value);
};

module.exports = { getAllUsers, getUserById, createUser, removeUser };