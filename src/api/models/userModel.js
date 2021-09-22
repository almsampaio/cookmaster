const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const USERS = 'users';

const removePassword = (user) => {
  const {
    password,
    ...props
  } = user;

  return { ...props };
};

const isValidID = (id) => ObjectId.isValid(id);

const signUp = async (user) => {
  const db = await getConnection();
  
  const result = await db.collection(USERS).insertOne(user); 
  
  if (!result.ops) return null;

  return { user: removePassword(result.ops[0]) };
};

const findByEmail = async (email) => {
  const db = await getConnection();

  const filter = { email };

  const result = await db.collection(USERS).findOne(filter);
  
  return result;
};

const findById = async (id) => {
  if (!isValidID(id)) return null;
  const db = await getConnection();

  const filter = { _id: ObjectId(id) };

  const result = await db.collection(USERS).findOne(filter);

  return result;
};

module.exports = { signUp, findByEmail, findById };