const { verify } = require('jsonwebtoken');
// const Users = require('../models/users');
// const Recipes = require('../models/recipes');
const { SECRET } = require('../data');

const authToken = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const { data } = verify(token, SECRET);
    req.user = data;

    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

const authAdmin = async (req, res, next) => {
  const { role } = req.user;
  // const { id } = req.params;
  // const recipe = await Recipes.getById(id);
  // if (!recipe) return res.status(401).json({ message: 'jwt malformed' });
  // const { role } = await Users.getById(recipe.userId);
  // if (role === 'admin') return next();

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }

  next();
};

module.exports = {
  authToken,
  authAdmin,
};