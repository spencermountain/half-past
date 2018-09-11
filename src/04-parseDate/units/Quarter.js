const spacetime = require('spacetime')

const quarterNames = {
  q1: 0,
  q2: 1,
  q3: 2,
  q4: 3,
}

class Quarter {
  constructor(doc, context) {
    let q = doc.match('#FinancialQuarter')
    let str = q.out('normal')
    if (q.found && quarterNames.hasOwnProperty(str)) {
      this.i = quarterNames[str]
      this.d = spacetime(context.quarters[this.i], context.timezone)
      this.d.startOf('day')
    }
    this.context = context
  }
  start() {
    return this.d.clone()
  }
  end() { //go forward a quarter, then back a day
    let startDay = this.context.seasons[(this.i + 1) % 3]
    let d = this.d.clone().set(startDay)
    d.minus(1, 'day')
    return d.endOf('day')
  }
  middle() {
    return this.d.clone().add(6, 'weeks') //todo: don't hardcode this
  }
  //'next' here refers to 'next q2', not next quarter..
  next() {
    return this.d.add(1, 'year')
  }
  last() {
    return this.d.minus(1, 'year')
  }
  isValid() {
    return this.d && this.d.isValid()
  }
}
module.exports = Quarter
