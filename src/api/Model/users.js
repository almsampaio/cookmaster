const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const connection = require('./connection');

async function checkEmailExistence(emailToFind) {
  try {
    const db = await connection();
    const queryResponse = await db.collection('users').findOne({ email: emailToFind });
    if (queryResponse) return true;
    return false;
  } catch (err) {
    console.log(err);
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return { statusCode, error: { message: getReasonPhrase(statusCode) } };
  }
}

async function insertOneUser(userToInsert) {
  try {
    const db = await connection();
    const queryResponse = await db.collection('users').insertOne(userToInsert);
    const { ops: [{ name, email, role }] } = queryResponse;
    const removedPassword = { name, email, role };
    return removedPassword;
  } catch (err) {
    console.log(err);
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return { statusCode, error: { message: getReasonPhrase(statusCode) } };
  }
}

module.exports = {
  checkEmailExistence,
  insertOneUser,
};
