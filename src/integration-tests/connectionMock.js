const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const bdMock = new MongoMemoryServer();

const mockConnection = async () => {
  
  const urlMock = await bdMock.getUri();
  
  return MongoClient.connect(urlMock, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = mockConnection;
