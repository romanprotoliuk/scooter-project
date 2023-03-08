class Scooter{
  static nextSerial = 1

  constructor(station) {
    this.station = station ? station : null
    this.user = null
    this.serial = Scooter.nextSerial++
    this.charge = 100
    this.isBroken = false
  }

  rent(user) {
    //I like how you separated these two errors to make sure the dev knows what exactly the issue is!
    if (this.charge < 20) {
      throw new Error("Scooter needs to charge")
    }

    if (this.isBroken) {
      throw new Error("Scooter needs repair")
    }

    this.station = null
    this.user = user

    console.log(`User ${user} has rented the scooter with a serial number ${this.serial}`)
  }

  dock(station) {
    this.station = station
    this.user = null

    console.log(`Scooter with a serial number ${this.serial} has been docked at station ${station} by a user ${this.user}`)
  }

  recharge() {

    const returnTime = () => {
      this.charge++;
      console.log(`Battery life is at ${this.charge}`);
      if (this.charge !== 100) {
        setTimeout(returnTime, 500);
      }
    };

    if (this.charge !== 100) {
      setTimeout(returnTime, 500);
    }
  }

  requestRepair() {
    setTimeout(() => {
      this.isBroken = false;
      console.log(`Scooter ${this.serial} repair completed`)
    }, 5000)
  }
}

// const scooter1 = new Scooter(1)
// scooter1.rent("romanprotoliuk")
// scooter1.dock(1)

// const scooter2 = new Scooter(2)
// scooter2.recharge()

// const scooter3 = new Scooter(3)
// scooter3.requestRepair()

module.exports = Scooter