const { config } = require('dotenv');

config();
module.exports = {
  mongoUrl: process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster',
  dbName: process.env.MONGO_DB_NAME || 'Cookmaster',
};
