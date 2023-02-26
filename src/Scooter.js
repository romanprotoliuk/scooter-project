class Scooter{
  constructor(station) {
    this.station = station ? station : null
    this.user = null
    this.nextSerial = 1
    this.serial = nextSerial
    this.charge = 100
    this.isBroken = false
  }

  rent(user) {
    if (this.charge > 20) {
      this.station = null
      this.user = user
    } else {
      throw new Error("Scooter needs to charge or scooter needs repair.")
    }
  }

  dock(station) {
    this.station = station
    this.user = null
  }

  recharge() {
    const returnTime = () => {
      this.charge++;
      console.log(`Battery life is at ${this.charge}`);
      if (this.charge !== 100) {
        setTimeout(returnTime, 500);
      }
    };
    setTimeout(returnTime, 500);
  }

  requestRepair() {
    // BONUS: Use a setInterval timer to schedule a repair in 5 seconds.
    // When time elapses, set isBroken to false and log repair completed to the console.
  }
}


module.exports = Scooter