const spacetime = require('spacetime')

class Week {
  constructor(str, context) {
    this.d = spacetime(context.today, context.timezone)
    this.d.startOf('week')
  // let counted = doc.match('#Ordinal week (of|in) .')
  // if (counted.found) {
  //   this.d = spacetime(context.today, context.timezone)
  // }
  }
  start() {
    return this.d.clone()
  }
  end() {
    return this.d.clone().endOf('week')
  }
  middle() {
    return this.d.clone().add(3, 'days')
  }
  //this is tricky
  next() {
    return this.d.clone().add(1, 'week')
  }
  last() {
    return this.d.clone().subtract(1, 'week')
  }
  //
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
module.exports = Week
