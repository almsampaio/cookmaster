const validEmail = (email) => {
  const response = /\S+@\S+\.\S+/;
  return response.test(email);
};

module.exports = validEmail;