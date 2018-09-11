const spacetime = require('spacetime')

class Weekday {
  constructor(str, context) {
    this.d = spacetime(context.today, context.timezone)
    if (str) {
      this.d.day(str)
    }
    this.d.startOf('day')
  }
  start() {
    return this.d.clone()
  }
  end() {
    return this.d.clone().endOf('day')
  }
  middle() {
    return this.d.clone().add(12, 'hours')
  }
  next() { //'next wednesday', not tomorrow.
    return this.d.clone().add(7, 'days')
  }
  last() {
    return this.d.clone().subtract(7, 'days')
  }
  nextOne() {
    this.d.add(1, 'week')
    return this
  }
  lastOne() {
    this.d.subtract(1, 'week')
    return this
  }
  isValid() {
    return this.d && this.d.isValid()
  }
}
module.exports = Weekday
