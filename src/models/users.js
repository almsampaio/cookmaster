const connection = require('./connection');

const create = async (novoUsuario) => {
    const { name, email, password } = novoUsuario;
    const role = 'user';
 const db = await connection();
  const { ops } = await db.collection('users').insertOne({ name, email, password, role });
  const { _id: id } = ops[0];
  return { name: ops[0].name, email: ops[0].email, role: ops[0].role, _id: id }; 
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