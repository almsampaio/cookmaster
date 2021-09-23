const { getUserByEmail } = require('../models/users');

const validateUserName = (name) => {
  if (!name) {
    return { 
      code: 400,
      errorInfo: { message: 'Invalid entries. Try again.' },
    }; 
  }
  return {};
};

const checkEmailAlreadyExists = async (email) => {
  const alredyExists = await getUserByEmail(email);
  if (alredyExists) {
    return {
        code: 409,
        errorInfo: { message: 'Email already registered' },
      }; 
  }
  return {};
};

const validateUserEmail = async (email) => {
  if (!email) {
    return { 
      code: 400,
      errorInfo: { message: 'Invalid entries. Try again.' },
    }; 
  } 
  const emailRegex = /\S+@\S+\.\S+/;
  if (emailRegex.test(email) === false) {
    console.log('entrou no if');
    return { 
       errorCode: 400,
       errorInfo: { message: 'Invalid entries. Try again.' },
     }; 
   }

  const alreadyExists = await checkEmailAlreadyExists(email);
  if (alreadyExists.errorInfo) return alreadyExists;
  
  return {};
};

const validateUserPassword = (password) => {
  if (!password) {
    return { 
       code: 400,
       errorInfo: { message: 'Invalid entries. Try again.' },
     }; 
   }
   return {};
};

module.exports = {
  validateUserEmail,
  validateUserName,
  validateUserPassword,
};