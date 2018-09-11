const spacetime = require('spacetime')

const quarterNames = {
  q1: 1,
  q2: 2,
  q3: 3,
  q4: 4,
}

// let q = doc.match('#FinancialQuarter')
class Quarter {
  constructor(str, context) {
    this.d = spacetime(context.today, context.timezone)
    if (str && quarterNames.hasOwnProperty(str) === true) {
      this.d.quarter(quarterNames[str])
    }
    this.d.startOf('quarter')
  }
  start() {
    return this.d.clone()
  }
  end() {
    return this.d.clone().endOf('quarter')
  }
  middle() {
    return this.d.clone().add(6, 'weeks')
  }
  // 'next' refers to next q1, not next quarter
  next() {
    return this.d.clone().add(1, 'year')
  }
  last() {
    return this.d.clone().subtract(1, 'year')
  }
  // q1 → q2
  nextOne() {
    this.d.add(1, 'quarter')
    return this
  }
  lastOne() {
    this.d.subtract(1, 'quarter')
    return this
  }
  isValid() {
    return this.d && this.d.isValid()
  }
}
module.exports = Quarter
