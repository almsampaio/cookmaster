// Solução encontrada em parceria com Eduardo Costa - Turma 10 A
const err = {
  fielRequired: 'Invalid entries. Try again.',
};

const validateName = (name) => {
  if (!name) return { message: err.fielRequired };
};

const validateEmail = (email) => {
  const regexEmail = /[^@]+@[^.]+\..+/g;
  if (!email || !regexEmail.test(email)) return { message: err.fielRequired };
};

module.exports = {
  validateName,
  validateEmail,
};
