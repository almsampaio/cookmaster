// Querry mongodb para criar usuário administrador
db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });