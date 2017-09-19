import { updateRates } from 'app/actions/currencies'

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
    this.intervals.push(setInterval(updateRates, 10 * 1000))
  }
}

export default new Subscriber()