const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const DBServer = new MongoMemoryServer();

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getConnectionMock = async () => {
  const URLMock = await DBServer.getUri();
  return await MongoClient.connect(URLMock, OPTIONS);
}

module.exports = getConnectionMock;