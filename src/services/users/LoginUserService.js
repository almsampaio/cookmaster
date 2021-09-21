const LoginUserModel = require('../../models/users/LoginUserModel');
const { getToken } = require('../../utils/token');

class LoginUserService {
  constructor(user) {
    this.user = user;
  }

  async handle() {
    const loginUserModel = new LoginUserModel(this.user);

    const user = await loginUserModel.handle();

    if (!user) {
      const err = {
        code: 401,
        message: 'Incorrect username or password',
        isError: true,
      };

      return err;
    }

    const { _id: id, email, role } = user;

    const token = getToken({ id, email, role });

    return token;
  }
}

module.exports = LoginUserService;
