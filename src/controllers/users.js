const jwt = require('jsonwebtoken');
const UsersServices = require('../services/users');

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const result = await UsersServices.create(name, email, password);
  if (result.message) return res.status(result.code).json({ message: result.message });
  res.status(201).json(result);
};

const createAdmin = async (req, res) => {
  const { role } = req.user;
  console.log('qualquer');
  if (role !== 'admin') {
    console.log('qualquer dentro');
    return res.status(403).json({ message: 'Only admins can register new admins' });    
  }

  const { name, email, password } = req.body;
  const result = await UsersServices.createAdmin(name, email, password);
  console.log('outro qualquer');
  if (result.message) return res.status(result.code).json({ message: result.message });
  res.status(201).json(result);
};

const login = async (req, res) => {
  const secret = 'edmilson';
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  let token = null;
  const { email, password } = req.body;

  const logged = await UsersServices.login(email, password);
  if (logged.message) return res.status(logged.code).json({ message: logged.message });

  if (logged) {
    const { _id, email: emailLogged, role } = logged;
    const userData = { _id, emailLogged, role };
  
    token = jwt.sign({ data: userData }, secret, jwtConfig);
  }
  res.status(200).json({ token });
};

module.exports = {
  create,
  createAdmin,
  login,
};
