const jwt = require('jsonwebtoken');
const UserModel = require('../../Model/UsersModel');

const secret = 'projectcookmaster';

const authJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'jwt malformed' });
  try {
    const decode = jwt.verify(token, secret);
    const user = await UserModel.searchByEmail(decode.data.email);
    if (!user) return res.status(401).json({ message: 'Não encontrado usuário' });
    req.user = user;
    next();
  } catch (err) { return res.status(401).json({ message: err.message }); }
};

module.exports = { authJWT };