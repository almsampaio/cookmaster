// colocar query do MongoDB
// use('Cookmaster');

// db.users.find({});

db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
