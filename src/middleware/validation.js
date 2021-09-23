const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');
const recipesServices = require('../services/recipesService');

const SECRET = 'loginsecret';
const UNAUTHORIZED_STATUS = 401;
const NOTFOUND_STATUS = 404;
const ERROR_404 = 'User without permission to change';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED_STATUS).json({ message: 'missing auth token' });
  }
  try {
    const payload = jwt.verify(token, SECRET);
    const user = await userModel.findByEmail(payload);
    if (!user) {
      return res.status(UNAUTHORIZED_STATUS).json({ message: 'invalid user' });
    }
    const { password: _, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const validateUser = async (req, _res, next) => {
  const { _id, role } = req.user;
  const { id } = req.params;
  try {
    const recipe = await recipesServices.getByIdRecipeServices(id);
    const { status, result } = recipe;
    if (status === 404) return next(recipe);
    if (role !== 'admin' && result.userId.toString() !== _id.toString()) {
      return next({ status: NOTFOUND_STATUS, err: ERROR_404 });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateToken,
  validateUser,
};
