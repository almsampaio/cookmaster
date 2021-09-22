require('dotenv').config();
const { MongoClient } = require('mongodb');

const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
// Solução para não ficar trocando de URL para testes locais e github - créditos: Renatão e Corujão https://trybecourse.slack.com/archives/C01L16B9XC7/p1631296337060200
const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = () => MongoClient.connect(MONGO_DB_URL, OPTIONS)
  .then((conn) => conn.db(DB_NAME));

module.exports = connection;
