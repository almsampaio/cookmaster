const modelsUsers = require('../models/users');
const util = require('../util/users');

const create = async (name, email, password) => {
    if (!name || !password || !util.validateEmail(email)) {
      return { status: 400, data: { message: 'Invalid entries. Try again.' } };
    }

    const newEmail = await modelsUsers.getEmail(email);
    if (newEmail) return { status: 409, data: { message: 'Email already registered' } };
    const createUser = await modelsUsers.create(
      { name, email, password },
    );
    return { status: 201, data: { user: createUser } };
};

const findUser = async (body) => {
 const validBory = util.checkData(body);
  if (validBory) return validBory;
  const result = await modelsUsers.getEmail(body.email);
  if (!result || result.email !== body.email || result.password !== body.password) {
 return { 
    status: 401, data: { message: 'Incorrect username or password' },
   }; 
}
  const validToken = util.createToken(result);
  return { status: 200, data: { token: validToken } };
};

const createAdm = async (name, email, password, role) => {
  if (role !== 'admin') {
    return { status: 403, data: { message: 'Only admins can register new admins' } };
  }
  const userAdm = await modelsUsers.createAdm(
    { name, email, password },
  );
  return { status: 201, data: { user: userAdm } };
};

module.exports = {
    create,
    findUser,
  createAdm,
};
