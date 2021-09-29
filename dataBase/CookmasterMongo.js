/* Não esquecer de:
1. Iniciar o serviço do mongodb no pc pelo comando:
sudo service mongod start

2. Instalar o pacote mongodb no projeto
npm install mongodb

3. Se ao tentar iniciar a API surgir o problema do "const utf8Encoder = new TextEncoder()"
no terminal, execute o arquivo "fixMongodbErrorUtf8Encoder.bash", que resolverá o
problema.
*/

/* EXECUTAR O COMANDO ABAIXO NO MONGOSH OU MONGODB;

use Cookmaster;
db.users.insertMany([
    { "name" : "Erick Jacquin",
      "email" : "erickjacquin@gmail.com",
      "password" : "12345678",
      "role" : "user" },
]);

use Cookmaster;
db.recipes.insertMany([
    { "itensSold": [{ "productId": "5f43cbf4c45ff5104986e81d",
      "quantity": 2 }]
    },
]);

*/