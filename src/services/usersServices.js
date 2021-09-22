const modelsUsers = require('../models/usersModels');
const validCampos = require('../schemas/validationsUsers');

const created = async (name, email, password) => {
  const validName = validCampos.nameObrigat(name);
  if (validName) return { status: 400, data: validName };

  const validPassword = validCampos.passwordObrigat(password);
  if (validPassword) return { status: 400, data: validPassword };

  const validEmail = validCampos.emailObrigat(email);
  if (validEmail) return { status: 400, data: validEmail };

  const existsEmail = await validCampos.emailExists(email);
  if (existsEmail) return { status: 409, data: existsEmail };

  const [newUser] = await modelsUsers.created(name, email, password);

  const { password: _, ...user } = newUser;

  return { status: 201, data: { user } };

  // return { status: 201, data: { user: { ...newUser } } };

  // return { status: 201, data: { user: {_id, name, email, password, role } } };
};

module.exports = {
  created,
};