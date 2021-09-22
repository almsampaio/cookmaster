const { MongoClient } = require('mongodb');

require('dotenv').config();

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const MONGO_DB_URL = process.env.MONGO_DB_URL_LOCAL || 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

let db = null;

const mongoDB = async () => {
    if (db) return db;
    const conn = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
    db = conn.db(DB_NAME);
    return db;
};

module.exports = { mongoDB };