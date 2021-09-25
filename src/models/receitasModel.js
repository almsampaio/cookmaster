const conexao = require('./conexao');

const cadastrarUsuario = async (name, ingredients, preparation, userID) => {
  const db = await conexao();
  
 const cadastrar = await db.collection('users')
 .insertOne({ name, ingredients, preparation, userID });

  return { recipe: cadastrar.ops[0] };
};

module.exports = {
  cadastrarUsuario,
};