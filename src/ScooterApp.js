const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  // ScooterApp code here
  constructor() {
    this.stations = {station1: [], station2: [], station3: []}
    this.registeredUsers = {usernames: []}
  }

  registerUser(username, password, age) {

  }
  // If the user is not already registered AND is 18 or older, then add them as a new registered user. 
  // Log to the console that the user has been registered and return the user.
  // If the user cannot be registered, throw an error: already registered or too young to register.

  loginUser(username, password) {

  }
  // Locate the registered user by name and call its login method. Log to the console that the user has been logged in. 
  // If the user cannot be located or if the password is incorrect, then throw an error: Username or password is incorrect.

  logoutUser(username) {

  }
  // Locate the registered user and call its logout method. Log user is logged out to the console.
  // If the user cannot be located, throw no such user is logged in error

  createScooter(station) {

  }
  // This method is called by the Scooter company’s home office when new scooters are deployed. 
  // Create a new scooter, add it to the station’s scooter list, and set its station property. 
  // Log created new scooter to the console. Return the scooter. 
  // Throws no such station error if the station does not exist. 

  dockScooter(scooter, station) {

  }
  // Add the scooter to the station’s scooter list, and dock it. 
  // Log scooter is docked to the console.  
  // Throws no such station error if the station does not exist. 
  // Throws scooter already at station error if the scooter is already there.

  rentScooter(scooter, user) {

  }
  // Locate the given scooter at one of the stations, and remove it from that station. Rent it to the user. Log scooter is rented to 
  // the console. 
  // If the scooter is already rented, throw the error scooter already rented.

  print() {
    
  }
  // You will use this handy method when testing your ScooterApp.
  // Log the list of registered users to the console.
  // Log the list of stations and how many scooters are at each station to the console.
  // Take a moment to format it nicely so you can read it.
}

module.exports = ScooterApp
