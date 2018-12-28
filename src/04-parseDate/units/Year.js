const spacetime = require('spacetime')

class Year {
  constructor(str, context) {
    this.d = spacetime(context.now, context.timezone)
    // let num = doc.match('#Year')
    if (str) {
      this.d.year(str)
    }
    this.d.startOf('year')
  }
  start() {
    return this.d.clone()
  }
  end() {
    return this.d.clone().endOf('year')
  }
  middle() {
    return this.d.clone().add(6, 'months')
  }
  next() {
    return this.d.clone().add(1, 'year')
  }
  last() {
    return this.d.clone().subtract(1, 'year')
  }
  nextOne() {
    this.d.add(12, 'months')
    return this
  }
  lastOne() {
    this.d.subtract(12, 'months')
    return this
  }
  isValid() {
    return this.d && this.d.isValid()
  }
}
module.exports = Year
