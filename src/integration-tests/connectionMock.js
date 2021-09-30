const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const getConnection = async () => {
  const DBServer = new MongoMemoryServer();
  const URLMock = await DBServer.getUri();

  return await MongoClient.connect(URLMock, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { getConnection };
