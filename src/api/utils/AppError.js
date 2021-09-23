// Tratamento de Erros com classe AppError
// baseado na postagem do Caputo no Slack
// Link: https://trybecourse.slack.com/archives/C01L16B9XC7/p1632346978443500

class AppError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

module.exports = AppError;