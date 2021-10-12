// Solução encontrada em parceria com Eduardo Costa - Turma 10 A
const err = {
  fieldRequired: 'Invalid entries. Try again.',
};

const validateName = (name) => {
  if (!name) return { message: err.fieldRequired };
};

const validateEmail = (email) => {
  const regexEmail = /[^@]+@[^.]+\..+/g;
  if (!email || !regexEmail.test(email)) return { message: err.fieldRequired };
};

const validatePassword = (password) => {
  if (!password) return { message: err.fieldRequired };
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
