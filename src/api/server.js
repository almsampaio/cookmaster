const app = require('./app');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`conectado na porta ${PORT}`);
  console.log(`Acessar: http://localhost:${PORT}`);
});
