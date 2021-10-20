const UserModel = require('../models/Users');

const Errors = {
  doesntMatch: {
    isValid: false,
    status: 401,
    json: {
      message: 'Incorrect username or password',
    },
  },
  fieldsIncomplete: {
    isValid: false,
    status: 401,
    json: {
      message: 'All fields must be filled',
    },
  },
};

const isNameValid = (name) => {
  if (!name || typeof name !== 'string') {
    return {
      isValid: false,
      status: 400,
      message: 'Invalid entries. Try again.',
    };
  }

  return {
    isValid: true,
  };
};

const validateEmailRegex = (email) => {
  const regex = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i);
  if (!email.match(regex)) {
    return {
      isValid: false,
      status: 400,
      message: 'Invalid entries. Try again.',
    };
  }

  return {
    isValid: true,
  };
};

const validateUniqueEmail = async (email) => {
  const users = await UserModel.getAll();
  const hasUserWithSameEmail = users.find((user) => user.email === email);
  if (hasUserWithSameEmail) {
    return {
      isValid: false,
      status: 409,
      message: 'Email already registered',
    };
  }
  return {
    isValid: true,
  };
};

const isEmailValid = async (email) => {
  if (!email || typeof email !== 'string') {
    return {
      isValid: false,
      status: 400,
      message: 'Invalid entries. Try again.',
    };
  }

  const validateEmailRegexObj = validateEmailRegex(email);
  if (!validateEmailRegexObj.isValid) return validateEmailRegexObj; 

  const validateUniqueEmailObj = await validateUniqueEmail(email);
  if (!validateUniqueEmailObj.isValid) return validateUniqueEmailObj;

  return {
    isValid: true,
  };
};

const isPasswordValid = (password) => {
  if (!password || typeof password !== 'string') {
    return {
      isValid: false,
      status: 400,
      message: 'Invalid entries. Try again.',
    };
  }

  return {
    isValid: true,
  };
};

const isValid = async (name, email, password) => {
  const isNameValidObj = await isNameValid(name);
  if (!isNameValidObj.isValid) return isNameValidObj;
  
  const isEmailValidObj = await isEmailValid(email);
  if (!isEmailValidObj.isValid) return isEmailValidObj;
  
  const isPasswordValidObj = isPasswordValid(password);
  if (!isPasswordValidObj.isValid) return isPasswordValidObj;

  return {
    isValid: true,
  };
};

const isEmailAndPasswordCorrect = async (email, password) => {
  const validateEmailRegexObj = validateEmailRegex(email);
  if (!validateEmailRegexObj.isValid) {
    return Errors.doesntMatch;
  } 
  
  const user = await UserModel.getByEmail(email);
  if (!user || user.password !== password) {
    return Errors.doesntMatch;
  }

  return {
    isValid: true,
    user,
  };
};

const create = async ({ name, email, password, role = 'user' }) => {
  const isValidObj = await isValid(name, email, password);
  if (!isValidObj.isValid) {
    return {
      status: isValidObj.status,
      json: {
          message: isValidObj.message,
      },
    };
  }

  const user = await UserModel.create({ name, email, password, role });

  return {
    status: 201,
    json: user,
  };
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    return Errors.fieldsIncomplete;
  }

  const isEmailAndPasswordCorrectObj = await isEmailAndPasswordCorrect(email, password);
  if (!isEmailAndPasswordCorrectObj.isValid) return isEmailAndPasswordCorrectObj;
  
  const { _id: id, role } = isEmailAndPasswordCorrectObj.user;

  return {
    status: 200,
    json: {
      id,
      email,
      role,
    },
  };
};

module.exports = {
  create,
  isValid,
  login,
};
