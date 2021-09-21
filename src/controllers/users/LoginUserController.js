const LoginUserService = require('../../services/users/LoginUserService');

class LoginUserController {
  static async handle(req, res, next) {
    const { email, password } = req.body;

    const loginUserService = new LoginUserService({
      email,
      password,
    });

    const token = await loginUserService.handle();

    if (token.isError) return next(token);

    res.status(200).json({ token });
  }
}

module.exports = LoginUserController;
