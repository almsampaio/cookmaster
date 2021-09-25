const nameValidator = async (name) => {
  if (!name) return false;
  return true;
};

const emailValidator = async (email) => {
  const emailRgx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email || !emailRgx.test(email)) return false;
  return true;
};

const passwordValidator = async (password) => {
  if (!password) return false;
  return true;
};

const userValidator = async (name, email, password) => {
  const checkName = await nameValidator(name);
  const checkEmail = await emailValidator(email);
  const checkPassword = await passwordValidator(password);

  if (!checkName || !checkEmail || !checkPassword) {
    return {
      error: true,
      message: 'Invalid entries. Try again.',
      status: 400,
    };
  }
  return true;
};

const userLoginValidator = async (email, password) => {
  const checkEmail = await emailValidator(email);
  const checkPassword = await passwordValidator(password);
  
  if (!checkEmail || !checkPassword) {
    return {
      error: true,
      message: 'All fields must be filled',
      status: 401,
    };
  }
  return true;
};

module.exports = {
  userValidator,
  userLoginValidator,
};