async function register() {
  return { statusCode: 200, payload: { message: 'From Services' } };
}

module.exports = {
  register,
};
