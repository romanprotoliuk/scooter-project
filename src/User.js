class User {
  constructor(username, password, age) {
    this.username = username
    this.password = password
    this.age = age
    this.loggedIn = false
  }

  login(password) {
    console.log(password)
    console.log(this.password)
    if (password === this.password) {
      this.loggedIn = true
      console.log(`User ${this.username} logged in.`)
      return `User ${this.username} logged in.`
    } else {
      throw new Error("Incorrect password error")
    }
  }


  logout() {
    this.loggedIn = false
    console.log(`${this.username} logged out.`)
    return `${this.username} logged out.`
  }
}

const user1 = new User("romanpro", "pass123", 24)
user1.login("pass123")
user1.logout()

module.exports = User
