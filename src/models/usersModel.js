const connection = require('./connection');

const findByEmail = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }));

  if (!user) return null;

  return user;
};

const create = async (name, email, password) => {
  const role = 'user';

  connection()
   .then((db) => db.collection('users').insertOne({ name, email, password, role }));

  const { _id } = await findByEmail(email);

  return { user: {
    _id,
    name,
    email,
    role,
    },
  };
};

const createAdmin = async (name, email, password) => {
  const role = 'admin';

  connection()
   .then((db) => db.collection('users').insertOne({ name, email, password, role }));

  const { _id } = await findByEmail(email);

  return { user: {
    _id,
    name,
    email,
    role,
    },
  };
};

module.exports = {
  create,
  findByEmail,
  createAdmin,
};
