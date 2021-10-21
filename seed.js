// colocar query do MongoDB
db.collection('users').insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' })