// const services = require('../services/loginServices');
const userModel = require('../models/userModel');
const getToken = require('../middlewares/token');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.searchByEmail(email);
  
  if (!user) return res.status(401).json({ message: 'Incorrect username or password' });

  if (user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const token = getToken(user);

  return res.status(200).json({ token });
};

module.exports = {
  login,
};