const Yup = require('yup');
// https://www.youtube.com/watch?v=KwrJSwWhIDI&ab_channel=PedroTech
const userSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

module.exports = userSchema;
