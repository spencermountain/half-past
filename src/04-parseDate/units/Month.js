const spacetime = require('spacetime')

class Month {
  constructor(str, context) {
    this.d = spacetime(context.now, context.timezone)
    if (str !== null) {
      this.d.month(str)
    }
    this.d.startOf('month')
  }
  start() {
    return this.d.clone()
  }
  end() {
    return this.d.clone().endOf('month')
  }
  middle() {
    return this.d.clone().add(2, 'weeks')
  }
  // 'next' refers to next february, not next month
  next() {
    return this.d.clone().add(1, 'year')
  }
  last() {
    return this.d.clone().subtract(1, 'year')
  }
  // february → march
  nextOne() {
    this.d.add(1, 'month')
    return this
  }
  lastOne() {
    this.d.subtract(1, 'month')
    return this
  }
  isValid() {
    return this.d && this.d.isValid()
  }
}
module.exports = Month
