const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

async function getConnection() {
  const URLMock = await DBServer.getUri();
  return MongoClient.connect(URLMock, OPTIONS)
} 

module.exports = {
  getConnection,
}