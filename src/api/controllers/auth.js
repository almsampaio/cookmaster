const { success } = require('../helpers/http');
const { authService } = require('../service/auth');

async function auth(request, response, next) {
  try {
    const authRes = await authService(request.body);
    return success(response, authRes);
  } catch (err) {
    next(err);
  }
}

module.exports = { auth };