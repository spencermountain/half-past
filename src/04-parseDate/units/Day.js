const spacetime = require('spacetime')

class Day {
  constructor(iso, context) {
    this.d = spacetime(context.now, context.timezone)
    this.context = context
    if (iso) {
      this.d = spacetime(iso, context.timezone)
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
  next() { //'next june 5th', not tomorrow.
    return this.d.clone().add(12, 'months')
  }
  last() {
    return this.d.clone().subtract(12, 'months')
  }
  nextOne() { //this is complicated.
    this.d.add(12, 'months')
    return this
  }
  lastOne() { //this is complicated, too
    this.d.minus(12, 'months')
    return this
  }
  isValid() {
    return this.d && this.d.isValid()
  }
}
module.exports = Day
