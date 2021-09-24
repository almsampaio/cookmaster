class User {
  constructor({ name, email, password, role = 'user' }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

module.exports = User;
