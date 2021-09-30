const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const connection = require('./connection');

async function matchEmailPassword({ email: emailToFind, password: passwordToMatch }) {
  try {
    const db = await connection();
    const queryResponse = await db.collection('users').aggregate([{
      $match: {
        $and: [{ email: emailToFind }, { password: passwordToMatch }],
      },
    }]).toArray();
    if (queryResponse.length > 0) {
      const [{ email, role }] = queryResponse;
      return { email, role };
    }
    return false;
  } catch (err) {
    console.log(err);
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return { statusCode, error: { message: getReasonPhrase(statusCode) } };
  }
}

module.exports = {
  matchEmailPassword,
};
