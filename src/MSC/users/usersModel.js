// const { ObjectId } = require('mongodb');
const connection = require('../Connection');

async function userRegisterModel(productToInsert) {
  try {
    const db = await connection();
    const queryResponse = await db.collection('users').insertOne(productToInsert);
    const { ops: [insertedProduct] } = queryResponse;
    const { name, email, role } = insertedProduct;
    return { name, email, role };
  } catch (err) {
    console.log(err);
    return {
      err,
    };
  }
}

async function findAUserWithEmail(emailToFind) {
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
  userRegisterModel,
  findAUserWithEmail,
};
