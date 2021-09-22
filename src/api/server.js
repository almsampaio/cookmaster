const app = require('./app');

// const PORT = 3000;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
