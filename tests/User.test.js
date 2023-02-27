const User = require('../src/User')

describe('User class', () => {
    const user = new User('testuser', 'testpassword', 25)
  
    it('should create a new user with correct properties', () => {
      expect(user.username).toEqual('testuser')
      expect(user.password).toEqual('testpassword')
      expect(user.age).toEqual(25)
      expect(user.loggedIn).toBeFalsy()
    })
  
    it('should log in a user with correct password', () => {
      expect(user.login('testpassword')).toEqual('User testuser logged in.')
      expect(user.loggedIn).toBeTruthy()
    })
  
    it('should throw an error if password is incorrect', () => {
      expect(() => user.login('wrongpassword')).toThrow('Incorrect password error')
      expect(user.loggedIn).toBeFalsy()
    })
  
    it('should log out a user', () => {
      expect(user.logout()).toEqual('testuser logged out.')
      expect(user.loggedIn).toBeFalsy()
    })
  })
