// The mock connection was wrong, I had the help of some colleagues to solve it:
// Murilo Gonçalves: https://github.com/MuriloGon
// Adelino: https://github.com/AdelinoJnr/AdelinoJnr

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const getConnection = async () => {
  const URLMock = await DBServer.getUri();
  return MongoClient.connect(URLMock, OPTIONS);
}

module.exports = { getConnection };