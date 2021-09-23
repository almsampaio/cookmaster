const fieldRequired = (name, email, password) => {
  if (!name || !email || !password) return { status: 400, message: 'Invalid entries. Try again.' };

  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(email)) return { status: 400, message: 'Invalid entries. Try again.' };
  return false;
};

module.exports = { fieldRequired };
