// const { ObjectId } = require('mongodb');
const connection = require('../Connection');

async function userRegisterModel(productToInsert) {
  try {
    const db = await connection();
    const queryResponse = await db.collection('users').insertOne(productToInsert);
    const { ops: [insertedProduct] } = queryResponse;
    console.log(insertedProduct);
    return insertedProduct;
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
    const queryResponse = await db.collection('users').find({ email: emailToFind });
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
