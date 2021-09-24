const conexao = require('./conexao');

const buscarPeloEmail = async (email) => {
  const db = await conexao();

  const buscar = await db.collection('users').findOne({ email });
  return buscar;
};

const cadastrarUsuario = async (name, email, password) => {
  const db = await conexao();
  
  const cadastrar = await db.collection('users')
  .insertOne({ name, email, password, role: 'user' });
  
  const { password: _, ...dadosSemSenha } = cadastrar.ops[0];
  return { user: dadosSemSenha };
};

const buscarPelaSenha = async (password) => {
  const db = await conexao();

  const buscar = await db.collection('users').findOne({ password });
  return buscar;
};

module.exports = {
  buscarPeloEmail,
  cadastrarUsuario,
  buscarPelaSenha,
};