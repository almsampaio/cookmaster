const Db = require("mongodb/lib/db");

// colocar query do MongoDB

Db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' })