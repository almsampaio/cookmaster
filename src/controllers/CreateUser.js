const model = require('../models/Usuarios');
const isValid = require('../services/auth/Validated');
const { BAD_REQUEST, INTERNAL_ERROR_SERVER, CREATED, CONFLICT } = require('./Status');

const createUser = async (req, res) => {
  try {
    const { error } = isValid.createValid(req.body);
    if (error) return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });

    const { name, email, password } = req.body;

    const getUser = await model.findUser(email);
    if (getUser && getUser.email === email) {
      return res
        .status(CONFLICT)
        .json({ message: 'Email already registered' });
    }

    const user = await model.registerUser(name, email, password);
    const { password: _password, ...userDatas } = user;

    res.status(CREATED).json({ user: { ...userDatas, role: 'user' } });
  } catch (e) {
    return res
      .status(INTERNAL_ERROR_SERVER)
      .json({ message: 'Internal Error', error: e });
  }
};

module.exports = { createUser };
