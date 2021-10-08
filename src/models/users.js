const connection = require('./connection');

const create = async (novoUsuario) => {
    const { name, email, password } = novoUsuario;
    const role = 'user';
 const db = await connection();
  const { ops } = await db.collection('users').insertOne({ name, email, password, role });
  return ops[0];
};

const getEmail = async (email) => {
    const db = await connection();
    const checkEmail = db.collection('users').findOne({ email });
    return checkEmail;
};

module.exports = {
    create,
    getEmail,
};