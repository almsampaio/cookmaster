const connection = require('../Connection');

async function findUserByEmail(emailToFind) {
  try {
    const db = await connection();
    const queryResponse = await db.collection('users').findOne({ email: emailToFind });
    return queryResponse;
  } catch (err) {
    console.log(err);
    return {
      err,
    };
  }
}

module.exports = {
  findUserByEmail,
};
