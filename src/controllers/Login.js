const jwt = require('jsonwebtoken');
const model = require('../models/Usuarios');
const isValid = require('../services/auth/Validated');
const { OK, UNAUTHORIZATED } = require('./Status');

const JWT_SECRET = 'segredaonosso';

const login = async (req, res) => {
  try {
    const { error } = isValid.loginValid(req.body);
    if (error) return res.status(UNAUTHORIZATED).json({ message: 'All fields must be filled' });

    const { email, password } = req.body;
    const verifyEmail = await isValid.emailExists(email, password);
    if (verifyEmail.code) return res.status(UNAUTHORIZATED).json({ message: verifyEmail.message });

    const user = await model.findUser(email);
    const payload = { user, role: 'user' };

    const token = jwt.sign(payload, JWT_SECRET);

    res.status(OK).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = {
  login,
};
