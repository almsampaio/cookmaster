const connect = require('../models/connection');

const errors = {
  INVALID_ENTRIES: 'Invalid entries. Try again.',
  EMAIL_CONFLICT: 'Email already registered',
};
const status = 400;

const verifyEntries = (name, email, password) => {
  const regex = /\S+@\S+\.\S+/;
  if (!name || !email || !password) return true;
  if (!regex.test(String(email).toLowerCase())) return true;
};
const checkEmail = async (email) => {
  const db = await connect();
  const findUser = await db.collection('users').findOne({ email });
  if (findUser) return true;
};

const createUser = async (name, email, password) => {
  const conflict = 409;

  switch (true) {
    case verifyEntries(name, email, password): return { status, message: errors.INVALID_ENTRIES };
    case (await checkEmail(email)): return { status: conflict, message: errors.EMAIL_CONFLICT };
    default: return {};
  }
};

module.exports = {
  createUser,
};