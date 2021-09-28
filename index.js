const express = require('express');
/* const rescue = require('express-rescue'); */
const bodyParser = require('body-parser');
// const rotaProducts = require('./route/rotaProducts');
// const rotaSales = require('./route/rotaSales');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

/* const rescue = require('express-rescue');

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ messege: err.message });
  return res.status(500).json({ messege: err.message });
});
 */
app.listen(3000, () => {
  console.log('Online');
}); 