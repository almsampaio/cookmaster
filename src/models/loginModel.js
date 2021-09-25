const conexao = require('./conexao');

const criarToken = require('../middlewares/token');

const loginUsuario = async (email) => {
  const db = await conexao();
  
  const buscarPeloEmail = await db.collection('users').findOne({ email });
  // Acrescentei o if abaixo para responder se o e-mail não está no banco de dados
  if (!buscarPeloEmail) return { message: 'E-mail ou senha estão incorretos!' };  

  const { password, name, ...dadosUsuario } = buscarPeloEmail;
  const usuariotoken = criarToken.novoToken(dadosUsuario);
  return usuariotoken;
};

module.exports = {
  loginUsuario,
};