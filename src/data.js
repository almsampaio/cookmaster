const PORT = 3000;
const URL = `localhost:${PORT}`;
const SECRET = 'Vaitentanto123';
const jwtConfig = {
  expiresIn: '3d',
  algorithm: 'HS256',
};

module.exports = {
  PORT,
  URL,
  SECRET,
  jwtConfig,
};