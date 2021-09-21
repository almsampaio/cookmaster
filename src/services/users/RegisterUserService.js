const GetUserByEmailModel = require('../../models/users/GetUserByEmailModel');
const RegistertUserModel = require('../../models/users/RegisterUserModel');

class RegisterUserService {
  constructor(user, role = 'user') {
    this.user = user;
    this.role = role;
  }

  async checkUserByEmail() {
    const { email } = this.user;

    const getUserByEmailModel = new GetUserByEmailModel(email);

    const alreadExistsUser = await getUserByEmailModel.handle();

    if (alreadExistsUser) {
      const err = {
        code: 409,
        message: 'Email already registered',
        isError: true,
      };

      return err;
    }

    return { isError: false };
  }

  async handle() {
    const alreadyExistsUser = await this.checkUserByEmail();

    if (alreadyExistsUser.isError) return alreadyExistsUser;

    const registerUserModel = new RegistertUserModel(this.user, this.role);

    const registeredUser = await registerUserModel.handle();

    return registeredUser;
  }
}

module.exports = RegisterUserService;
