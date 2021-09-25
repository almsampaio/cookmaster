const conexao = require('./conexao');

const cadastrarUsuario = async (name, ingredients, preparation, userID) => {
  const db = await conexao();
  
 const cadastrar = await db.collection('recipes')
 .insertOne({ name, ingredients, preparation, userID });

  return { recipe: cadastrar.ops[0] };
};

const listarReceitas = async () => {
  const db = await conexao();
  const receitas = await db.collection('recipes').find({}).toArray();
  return receitas;
};

module.exports = {
  cadastrarUsuario,
  listarReceitas,
};