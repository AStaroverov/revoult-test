import { updateRatesFixer, updateRatesFixer1, updateRatesFixer2 } from 'app/actions/rates'

class Subscriber {
  intervals = []

  start () {
    this.updateRatesInterval()
  }

  stop () {
    this.intervals.forEach(id => clearInterval(id))
    this.intervals = []
  }

  updateRatesInterval () {
    this.intervals.push(setInterval(updateRatesFixer, 10 * 1000))
    this.intervals.push(setInterval(updateRatesFixer1, 10 * 1000))
    this.intervals.push(setInterval(updateRatesFixer2, 10 * 1000))
  }
}

export default new Subscriber()