class User {
  constructor(username, password, age) {
    this.username = username
    this.password = password
    this.age = age
    this.loggedIn = false
  }

  login(password) {
    // If password is correct, logs the User in. If not, throws incorrect password error.
    if (password === this.password) {
      this.loggedIn = true
      return `User ${this.username} logged in.`
    } else {
      throw new Error("Incorrect password error")
    }
  }


  logout() {
    this.loggedIn = false
    return "Logged out"
  }
}

module.exports = User
