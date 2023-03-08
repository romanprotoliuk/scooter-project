const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  // ScooterApp code here
  constructor() {
    this.stations = {"SeaTac": [], "Tacoma": [], "Seattle": []}
    this.registeredUsers = {usernames: []}
  }

  registerUser(username, password, age) {
    //Nice use of "hasOwnProperty!"
    if (this.registeredUsers.hasOwnProperty(username)) {
      throw new Error("User already registered.");
    } else if (age < 18) {
      throw new Error("User must be 18 or older to register.");
    } else {
      const user = new User(username, password, age);
      this.registeredUsers[username] = user;
      console.log(`User ${username} has been registered.`);
      return user;
    }
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (!user || !user.login(password)) {
      throw new Error("Username or password is incorrect.");
    } else {
      console.log(`User ${username} has been logged in.`);
    }
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user) {
      throw new Error("No such user exists");
    } else {
      user.logout()
      console.log(`User ${username} has been logged out.`);
    }
  }

  createScooter(station) {
    if (!this.stations.hasOwnProperty(station)) {
      throw new Error("No such station.");
    } else {
      const scooter = new Scooter();
      scooter.station = station;
      this.stations[station].push(scooter);
      console.log(`Created new scooter at station: ${station}.`);
      return scooter;
    }
  }

  dockScooter(scooter, station) {
    if (!this.stations.hasOwnProperty(station)) {
      throw new Error("No such station.");
    } else if (scooter.station === station) {
      throw new Error("Scooter already at station.");
    } else {
      const index = this.stations[scooter.station].indexOf(scooter);
      this.stations[scooter.station].splice(index, 1);
      this.stations[station].push(scooter);
      scooter.station = station;
      console.log(`Scooter is docked at statian: ${station}.`);
    }
  }

  rentScooter(scooter, user) {
    if (scooter.user) {
      throw new Error("Scooter already rented")
    } else {
      const index = this.stations[scooter.station].indexOf(scooter)
      this.stations[scooter.station].splice(index, 1)
      scooter.user = user
      console.log(`Scooter ${scooter.serial} is rented by ${user.username}`)
    }
  }

  print() {
    console.log("Registered Users:");
    console.table(this.registeredUsers);
    console.log("Stations:");
    for (const station in this.stations) {
      console.log(`${station}: ${this.stations[station].length} scooters`);
    }
  }
}

//Are these test cases? Might be best to keep these in the test files
const newScootApp = new ScooterApp()
newScootApp.registerUser("rom4ik", "pass123", 23)
const Dom = newScootApp.registerUser("Dom4ik", "pass123", 27)
newScootApp.loginUser("rom4ik", "pass123")
const dockedScoot = newScootApp.createScooter("Tacoma")
newScootApp.dockScooter(dockedScoot, "SeaTac")
newScootApp.rentScooter(dockedScoot, Dom)
newScootApp.print()
// newScootApp.registerUser("rom4ik", "pass123", 23)

module.exports = ScooterApp
