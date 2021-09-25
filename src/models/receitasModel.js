const { ObjectId } = require('bson');
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

const listarReceitasPorID = async (id) => {
  // Verificando se o id é válido
  if (!ObjectId.isValid(id)) return null;
  const db = await conexao();
  const receita = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return receita;
};

module.exports = {
  cadastrarUsuario,
  listarReceitas,
  listarReceitasPorID,
};