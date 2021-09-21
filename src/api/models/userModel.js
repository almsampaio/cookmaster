const { getConnection } = require('./connection');

const USERS = 'users'

const signUp = async (user) => {
  const db = await getConnection();
  const result = await db.collection(USERS).insertOne(user); 
  
  if(!result) return null

  return { user: result.ops[0] };
}

module.exports = { signUp };