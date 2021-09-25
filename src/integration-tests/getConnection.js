const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();

const getconnectionMock = async () => {
  const URLMock = await DBServer.getUri();
  return MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = { getconnectionMock };
