const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

const User = require('./User')
const Scooter = require('./Scooter')
const ScooterApp = require('./ScooterApp')

describe('ScooterApp class', () => {
  let app;

  beforeEach(() => {
    app = new ScooterApp();
  });

  afterEach(() => {
    app = null;
  });

  describe('registerUser', () => {
    it('should register a new user with valid input', () => {
      const user = app.registerUser('testuser', 'testpassword', 20);

      expect(user.username).toEqual('testuser');
      expect(user.age).toEqual(20);
      expect(app.registeredUsers['testuser']).toEqual(user);
      expect(console.log).toHaveBeenCalledWith('User testuser has been registered.');
    });

    it('should throw an error if user is already registered', () => {
      app.registeredUsers['testuser'] = {};

      expect(() => {
        app.registerUser('testuser', 'testpassword', 20);
      }).toThrowError('User already registered.');
    });

    it('should throw an error if user is under 18', () => {
      expect(() => {
        app.registerUser('testuser', 'testpassword', 17);
      }).toThrowError('User must be 18 or older to register.');
    });
  });

  describe('loginUser', () => {
    it('should log in a user with valid input', () => {
      const user = new User('testuser', 'testpassword', 20);
      app.registeredUsers['testuser'] = user;

      expect(() => {
        app.loginUser('testuser', 'testpassword');
      }).not.toThrow();

      expect(user.loggedIn).toBeTruthy();
      expect(console.log).toHaveBeenCalledWith('User testuser has been logged in.');
    });

    it('should throw an error if user is not registered', () => {
      expect(() => {
        app.loginUser('testuser', 'testpassword');
      }).toThrowError('Username or password is incorrect.');
    });

    it('should throw an error if password is incorrect', () => {
      const user = new User('testuser', 'testpassword', 20);
      app.registeredUsers['testuser'] = user;

      expect(() => {
        app.loginUser('testuser', 'wrongpassword');
      }).toThrowError('Username or password is incorrect.');
    });
  });

  describe('logoutUser', () => {
    it('should log out a user with valid input', () => {
      const user = new User('testuser', 'testpassword', 20);
      app.registeredUsers['testuser'] = user;
      user.loggedIn = true;

      expect(() => {
        app.logoutUser('testuser');
      }).not.toThrow();

      expect(user.loggedIn).toBeFalsy();
      expect(console.log).toHaveBeenCalledWith('User testuser has been logged out.');
    });

    it('should throw an error if user is not registered', () => {
      expect(() => {
        app.logoutUser('testuser');
      }).toThrowError('No such user exists');
    });
  });

  describe('createScooter', () => {
    it('should create a new scooter at a valid station', () => {
      const scooter = app.createScooter('Tacoma');
  
      expect(scooter.station).toEqual('Tacoma');
      expect(app.stations['Tacoma']).toContain(scooter);
      expect(console.log).toHaveBeenCalledWith('Created new scooter at station: Tacoma.');
    });
  
    it('should throw an error if station is not valid', () => {
      expect(() => {
        app.createScooter('InvalidStation');
      }).toThrowError('No such station.');
    });
  });

  describe('dockScooter', () => {
    let app;
    let scooter;
  
    beforeEach(() => {
      app = new ScooterApp();
      scooter = new Scooter();
      scooter.station = 'Tacoma';
      app.stations['Tacoma'].push(scooter);
    });
  
    afterEach(() => {
      app = null;
      scooter = null;
    });
  
    it('should dock a scooter at a valid station', () => {
      app.dockScooter(scooter, 'SeaTac');
  
      expect(scooter.station).toEqual('SeaTac');
      expect(app.stations['SeaTac']).toContain(scooter);
      expect(app.stations['Tacoma']).not.toContain(scooter);
      expect(console.log).toHaveBeenCalledWith(`Scooter is docked at station: SeaTac.`);
    });
  
    it('should throw an error if station is not valid', () => {
      expect(() => {
        app.dockScooter(scooter, 'InvalidStation');
      }).toThrowError('No such station.');
    });
  
    it('should throw an error if scooter is already at the station', () => {
      app.stations['SeaTac'].push(scooter);
  
      expect(() => {
        app.dockScooter(scooter, 'SeaTac');
      }).toThrowError('Scooter already at station.');
    });
  });
  
  describe('rentScooter', () => {
    let app;
    let scooter;
    let user;
  
    beforeEach(() => {
      app = new ScooterApp();
      scooter = new Scooter();
      scooter.station = 'Tacoma';
      app.stations['Tacoma'].push(scooter);
      user = new User('testuser', 'testpassword', 20);
    });
  
    afterEach(() => {
      app = null;
      scooter = null;
      user = null;
    });
  
    it('should rent a scooter to a user', () => {
      app.rentScooter(scooter, user);
  
      expect(scooter.user).toEqual(user);
      expect(app.stations['Tacoma']).not.toContain(scooter);
      expect(console.log).toHaveBeenCalledWith(`Scooter ${scooter.serial} is rented by testuser`);
    });
  
    it('should throw an error if scooter is already rented', () => {
      scooter.user = new User('anotheruser', 'anotherpassword', 30);
  
      expect(() => {
        app.rentScooter(scooter, user);
      }).toThrowError('Scooter already rented');
    });
  });
})
