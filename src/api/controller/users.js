const rescue = require('express-rescue');
const serviceUsers = require('../service/users');

const addUser = rescue(
  async (req, res) => {
    const { name, password, email } = req.body;
    const value = await serviceUsers.addUser(name, password, email);

    return res.status(201).json({ user: value });
  },
);

const findUser = rescue(
  async (req, res) => {
    const { email, password } = req.body;
    const token = await serviceUsers.findUser(email, password);

    return res.status(200).json({ token });
  },
);

const addRecipes = rescue(
  async (req, res) => {
    const { authorization } = req.headers;
    const recipe = await serviceUsers.addRecipes(req.body, authorization);

    return res.status(201).json({ recipe });
  },
);

module.exports = {
  addUser,
  findUser,
  addRecipes,
};
