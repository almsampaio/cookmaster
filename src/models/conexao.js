const { MongoClient } = require('mongodb');
require('dotenv').config();

// O arquivo .env JÁ ESTÁ configurado no ".gitignore" deste projeto, portanto não
// será enviado ao GitHub, consequentemente o avaliador usará a URL correta abaixo.
const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

// O restante do código é igual ao utilizado no projeto anterior.
const conexao = async () => MongoClient
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => connection.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = conexao;