const Scooter = require('../src/Scooter')
const User = require('../src/User')

describe('Scooter', () => {
  let scooter;

  beforeEach(() => {
    scooter = new Scooter('Station 1');
  });

  afterEach(() => {
    scooter = null;
  });

  describe('rent', () => {
    it('should throw an error when charge is less than 20', () => {
      scooter.charge = 10;

      expect(() => {
        scooter.rent('User 1');
      }).toThrowError('Scooter needs to charge');
    });

    it('should throw an error when the scooter is broken', () => {
      scooter.isBroken = true;

      expect(() => {
        scooter.rent('User 1');
      }).toThrowError('Scooter needs repair');
    });

    it('should set the user and station to null and log a message', () => {
      scooter.rent('User 1');

      expect(scooter.user).toBe('User 1');
      expect(scooter.station).toBeNull();
      expect(console.log).toHaveBeenCalledWith(`User User 1 has rented the scooter with a serial number ${scooter.serial}`);
    });
  });

  describe('dock', () => {
    it('should set the station and user to null and log a message', () => {
      scooter.dock('Station 2');

      expect(scooter.station).toBe('Station 2');
      expect(scooter.user).toBeNull();
      expect(console.log).toHaveBeenCalledWith(`Scooter with a serial number ${scooter.serial} has been docked at station Station 2 by a user null`);
    });
  });

  describe('recharge', () => {
    it('should increase the charge to 100 over time', () => {
      scooter.charge = 50;
      jest.useFakeTimers();

      scooter.recharge();
      jest.advanceTimersByTime(500);

      expect(scooter.charge).toBe(51);
      expect(console.log).toHaveBeenCalledWith('Battery life is at 51');

      jest.advanceTimersByTime(500);

      expect(scooter.charge).toBe(52);
      expect(console.log).toHaveBeenCalledWith('Battery life is at 52');

      // continue until charge is 100

      jest.useRealTimers();
    });

    it('should not increase the charge when it is already at 100', () => {
      jest.useFakeTimers();

      scooter.recharge();
      jest.advanceTimersByTime(500);

      expect(scooter.charge).toBe(100);
      expect(console.log).toHaveBeenCalledWith('Battery life is at 100');

      jest.useRealTimers();
    });
  });

  describe('requestRepair', () => {
    it('should set isBroken to false after 5 seconds', () => {
      scooter.isBroken = true;
      jest.useFakeTimers();

      scooter.requestRepair();
      jest.advanceTimersByTime(5000);

      expect(scooter.isBroken).toBe(false);
      expect(console.log).toHaveBeenCalledWith(`Scooter ${scooter.serial} repair completed`);

      jest.useRealTimers();
    });
  });
});
